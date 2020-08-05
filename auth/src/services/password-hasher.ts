import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const asyncScrypt = promisify(scrypt);

export default class PasswordHasher {
  static async toHash(password: string): Promise<string> {
    const salt = randomBytes(8).toString("hex");
    const buf = (await asyncScrypt(password, salt, 64)) as Buffer;

    // Return the hashed password with the salt
    return `${buf.toString("hex")}.${salt}`;
  }

  static async comparePassword(
    storedPassword: string,
    supplyPassword: string
  ): Promise<Boolean> {
    const [hash, salt] = storedPassword.split(".");
    const buf = (await asyncScrypt(supplyPassword, salt, 64)) as Buffer;

    // Simply comparing hex representations of the password
    return buf.toString("hex") === hash;
  }
}
