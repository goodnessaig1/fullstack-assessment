import jwt from "jsonwebtoken";

const SECRET =
  process.env.JWT_SECRET || "super_secret_jwt_key_here_change_me_in_prod";

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, SECRET);
};
