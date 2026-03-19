import buildLogger from "../config/buildLogger.js";
const PORTAL_LOGGER = "PORTAL_LOGGER";
const APP_LOGGER = "APP_LOGGER";
const AUDIT_LOGGER = "AUDIT_LOGGER";
const SYSTEM_LOGGER = "SYSTEM_LOGGER";
const WEB_LOGGER = "WEB_LOGGER";

let loggers = {};

loggers[PORTAL_LOGGER] = buildLogger(PORTAL_LOGGER);
loggers[APP_LOGGER] = buildLogger(APP_LOGGER);
loggers[AUDIT_LOGGER] = buildLogger(AUDIT_LOGGER);
loggers[WEB_LOGGER] = buildLogger(WEB_LOGGER);

const defaultLogger = () => {
  loggers = buildLogger(SYSTEM_LOGGER);
};

const portalLogger = loggers[PORTAL_LOGGER];
const appLogger = loggers[APP_LOGGER];
const auditLogger = loggers[AUDIT_LOGGER];
const webLogger = loggers[WEB_LOGGER];

export { portalLogger, appLogger, auditLogger, webLogger };
export default defaultLogger;
