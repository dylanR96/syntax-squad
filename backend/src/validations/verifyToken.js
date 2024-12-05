import { sendError } from "../utils/responseHelper.js";
import { tryCatchWrapper } from "../utils/tryCatchUtil.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "secret_secret_secret";

export const verifyToken = async (event) => {
  const authHeader =
    event.headers?.Authorization || event.headers?.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw sendError(401, "Missing or invalid token");
  }

  const token = authHeader.split(" ")[1];

  return tryCatchWrapper(async () => {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  });
};
