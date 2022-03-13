import { Response } from "express";
import { sign } from "jsonwebtoken";

export const createAccessToken = (id: string) => {
  return sign({ id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "15m" });
};

export const createRefreshToken = (id: string, tokenVersion: number) => {
  return sign({ id, tokenVersion }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "7d" });
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("pcjid", token, {
    httpOnly: true,
    path: "/refresh_token",
  });
};
