import jwt from "jsonwebtoken";

const JWT_EXPIRES_IN = "1h";

const JWT_SECRET = "secret_secret_secret";

export const validateUser = (data, role) => {
  const payload = {
    id: data.id,
    role: role,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return token;
};
