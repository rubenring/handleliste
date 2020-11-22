import randtoken from "rand-token";
import bcrypt from "bcryptjs";
import {
  EncryptionError,
  CompareCryptError,
  NotAutorized,
} from "../Errors/CustomError";

export const generateRandomTokenString = () => randtoken.uid(256);

export const enctyptString = (stringToEncrypt) => {
  try {
    return bcrypt.hashSync(stringToEncrypt, 8);
  } catch (e) {
    throw new EncryptionError(e.message);
  }
};

export const compareEnctypted = async (string1, string2) => {
  try {
    return bcrypt.compare(string1, string2);
  } catch (e) {
    throw new CompareCryptError(e.message);
  }
};
