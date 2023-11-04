import { hash, compare } from "bcryptjs"

async function hashedPassword(password) {

    const hashPassword = await hash(password, 12);
    return hashPassword;
  
}

export default hashedPassword;

export async function verifyPassword(password, hashedPassword) {
    const isValid = await compare(password, hashedPassword);
    return isValid;
}