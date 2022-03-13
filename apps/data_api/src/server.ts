import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import http from "http";
import "reflect-metadata";
import { Resolver, Query, buildSchema, FieldResolver, Ctx, Root, Authorized } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { resolvers, applyModelsEnhanceMap, applyResolversEnhanceMap } from "@generated/type-graphql";
import { Context } from "./interfaces";
import { authChecker } from "./auth/auth_checker";
import { resolversEnhanceMap } from "./auth/resolver_enhanced_map";
import { modelsEnhanceMap } from "./auth/model_enhanced_map";
import AuthResolver from "./resolvers/auth_resolvers";
// custom resolver for custom business logic using Prisma Client
//applyModelsEnhanceMap(modelsEnhanceMap);
//applyResolversEnhanceMap(resolversEnhanceMap);

async function main() {
  const app = express();
  app.use(cookieParser());

  app.post("/refresh_token", (req, res) => {
    console.log(req.cookies);
    const token = req.cookies["pcjid"];
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REQUEST_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    const userId = payload.userId;
  });

  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [...resolvers, AuthResolver],
    emitSchemaFile: path.resolve(__dirname, "./generated-schema.graphql"),
    validate: false,
    authChecker,
  });

  const prisma = new PrismaClient();

  const server = new ApolloServer({
    schema,
    context: ({ req, res }): Context => {
      return { req, res, prisma };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

main().catch(console.error);
