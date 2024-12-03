import bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from "../constants/saltRounds.js";

export const passwordHasher = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS)
    return hashedPassword;
}

export const verifyPassword = async (rawPassword, hashedPassword) => {
    const deHashedPassword = await bcrypt.compare(rawPassword, hashedPassword)
    return deHashedPassword;
}