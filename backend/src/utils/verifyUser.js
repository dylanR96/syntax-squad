import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../constants/JWT.js";

export const verifyUser = (data, role) => {
  const payload = {
    id: data.id,
    role: role,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return token;
};
