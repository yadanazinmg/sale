import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export interface AuthUser {
  id: string;
  name: string;
  roles: string[];
}

export interface Context {
  req: Request;
  res: Response;
  prisma: PrismaClient;
  user?: AuthUser;
}

// export enum Role {
//   ADMIN = 1,
//   USER,
// }
