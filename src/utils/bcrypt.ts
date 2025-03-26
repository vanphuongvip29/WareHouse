import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPasswordUtil = async (plainPassword: string) => {
  try {
    const h = await bcrypt.hash(plainPassword, saltRounds);
    return h;
  } catch (error) {
    console.log(error);
  }
};

export const comparePasswordUtil = async (
  plainPassword: string,
  hashPassword: string,
) => {
  try {
    const c = await bcrypt.compare(plainPassword, hashPassword);
    return c;
  } catch (error) {
    console.log(error);
  }
};
