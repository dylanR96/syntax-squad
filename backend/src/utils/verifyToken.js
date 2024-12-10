import { tryCatchWrapper } from "./tryCatchUtil.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/JWT.js";

export const verifyToken = async (event) => {
  const authHeader =
    event.headers?.Authorization || event.headers?.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Missing or invalid token");
  }

  const token = authHeader.split(" ")[1];

  return tryCatchWrapper(async () => {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  });
};
