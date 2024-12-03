import { verifyToken } from "../utils/verifyToken.js";

export const authorizeAdmin = async (event) => {
    const user = await verifyToken(event);
    if(user.role !== "admin") {
        throw new Error("Forbidden: Unauthorized access")
    }
    return user;
}