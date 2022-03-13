import bcrypt from "bcryptjs";
import { Resolver, ArgsType, Field, Args, Query, Mutation, ID, Float, Int, Ctx, Arg, ObjectType, Authorized } from "type-graphql";
import { User, Role } from "@generated/type-graphql";
import { Context } from "../interfaces";
import { createAccessToken, createRefreshToken, sendRefreshToken } from "../auth/tokens";

@ArgsType()
export class SignInArgs {
  @Field((type) => String, { nullable: false })
  name!: string;

  @Field((type) => String, { nullable: false })
  pwd!: string;
}

@ArgsType()
export class CreateUserArgs {
  @Field((type) => String, { nullable: false })
  name!: string;

  @Field((type) => String, { nullable: false })
  password!: string;

  @Field((type) => Role, { nullable: false })
  role!: Role;
}

@ArgsType()
export class RevokeRefreshTokensArgs {
  @Field((type) => String, { nullable: false })
  name!: string;
}

@ObjectType()
export class SignInResponse {
  @Field((type) => String)
  accessToken?: string;

  @Field()
  user?: User;
}

@Resolver()
class AuthResolver {
  @Query(() => String)
  greet(): String {
    return "Hello!";
  }

  @Mutation((returns) => User, { nullable: true })
  async insertAppUser(@Ctx() { req, res, prisma }: Context, @Args() { name, password, role }: CreateUserArgs): Promise<User | null> {
    var salt = bcrypt.genSaltSync(10);
    const pwd_hash = bcrypt.hashSync(password, salt);
    const user = await prisma.user.create({
      data: {
        name,
        password: pwd_hash,
        role,
      },
    });

    return user as User;
  }

  @Mutation((returns) => User, { nullable: true })
  async upsertAppUser(@Ctx() { req, res, prisma }: Context, @Args() { name, password, role }: CreateUserArgs): Promise<User | null> {
    var salt = bcrypt.genSaltSync(10);
    const pwd_hash = bcrypt.hashSync(password, salt);
    const user = await prisma.user.upsert({
      where: { name: name },
      update: {
        name,
        password: pwd_hash,
        role,
      },
      create: {
        name,
        password: pwd_hash,
        role,
      },
    });

    return user as User;
  }

  //@Authorized("ADMIN")
  @Mutation((returns) => SignInResponse, { nullable: true })
  async signIn(@Ctx() { req, res, prisma }: Context, @Args() { name, pwd }: SignInArgs): Promise<SignInResponse | null> {
    console.log({ name, pwd });
    const user = (await prisma.user.findFirst({
      where: {
        name: {
          equals: name,
        },
      },
    })) as User;
    if (user) {
      const valid = bcrypt.compareSync(pwd, user.password);
      if (valid) {
        const accessToken = createAccessToken(user.id);
        const refreshToken = createRefreshToken(user.id, user.token_version);

        sendRefreshToken(res, refreshToken);
        return {
          accessToken: accessToken,
          user,
        };
      }
    }

    return null;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async signOut(@Ctx() { res }: Context) {
    sendRefreshToken(res, "");

    return true;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Ctx() { req, res, prisma }: Context, @Args() { name }: RevokeRefreshTokensArgs) {
    const updateUser = await prisma.user.update({
      where: {
        name: name,
      },
      data: {
        token_version: { increment: 1 },
      },
    });

    return true;
  }
}

export default AuthResolver;
