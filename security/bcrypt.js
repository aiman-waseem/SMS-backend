import bcrypt from 'bcryptjs';
const saltRounds = 8;

export const hashAsync = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

export const isVerifyAsync = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export const createHashedOTP = async (otp) => {
  return await bcrypt.hash(otp, saltRounds);
};

