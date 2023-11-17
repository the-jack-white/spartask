import bcrypt from "bcryptjs";

export const generateAuthToken = (password: string) => {
  return new Promise((res, rej) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      res(hash);
    } catch (err) {
      rej(err);
    }
  });
};
