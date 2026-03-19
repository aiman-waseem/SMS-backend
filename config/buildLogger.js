import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import util from "util";

const { createLogger, format, transports } = winston;
const { combine, timestamp, errors, printf } = format;

function buildLogger(LOGGER_NAME) {
  const logFormat = printf((info) => {
    const meta = info[Symbol.for("splat")];

    let metaString = "";
    if (meta && meta.length > 0) {
      // Use util.inspect to print object-like console.log would
      metaString =
        " " +
        meta
          .map((m) => util.inspect(m, { depth: null, colors: false }))
          .join(" ");
    }

    if (info instanceof Error) {
      return `${info.timestamp} ${info.level}: ${info.message} ${info.stack}${metaString}`;
    }

    return `${info.timestamp} ${info.level}: ${info.message}${metaString}`;
  });

  const infoTransport = new DailyRotateFile({
    filename: `logs/${LOGGER_NAME}.%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    handleExceptions: true,
    maxSize: "50m",
    maxFiles: "365d",
    utc: false,
    timezone: "Asia/Karachi",
  });

  return createLogger({
    level: "info",
    format: combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      logFormat,
    ),
    transports: [infoTransport],
  });
}

export default buildLogger;
