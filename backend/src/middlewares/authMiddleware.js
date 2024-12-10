import { ADMIN_ROLE, CUSTOMER_ROLE } from "../constants/userRole.js";
import { verifyToken } from "../utils/verifyToken.js";

export const authorizeAdmin = async (event) => {
    const user = await verifyToken(event);
    if(user.role !== ADMIN_ROLE) {
        throw new Error("Forbidden: Unauthorized access")
    }
    return user;
};

export const authorizeCustomer = async (event) => {
    const user = await verifyToken(event);
    if(user.role !== CUSTOMER_ROLE) {
        throw new Error("Forbidden: Unathorized access")
    }
    return user;
}

export const authorizeAccess = async (event) => {
    const user = await verifyToken(event);
    if(user.role !== CUSTOMER_ROLE && user.role !== ADMIN_ROLE) {
        throw new Error("Forbidden: Unathorized access")
    }
    return user;
}