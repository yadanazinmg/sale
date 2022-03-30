import { Response } from "express";
import { sign } from "jsonwebtoken";

export const createAccessToken = (id: string) => {
  return sign({ id }, "qbm6gHMErTuCMnv4EWs7h6WI9k7ZWOmy", { expiresIn: "15m" });
};

export const createRefreshToken = (id: string, tokenVersion: number) => {
  return sign({ id, tokenVersion }, "f9REvN8shXMJB7puJJ3KfLIoSFQcygRM", { expiresIn: "7d" });
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("pcjid", token, {
    httpOnly: true,
    path: "/refresh_token",
  });
};
