import bcrypt from 'bcryptjs';
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { constants } from '../../constants';
import { User } from '../../entity/User';
import {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
} from '../../helpers/generateToken';
import { isAuth } from '../../helpers/isAuth';
import { MyContext } from '../../types';

@ObjectType()
class LoginResponse {
  @Field(() => String)
  access_token: string;

  @Field(() => User)
  user: User;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hello world';
  }

  // current user
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { tokenPayload }: MyContext) {
    if (!tokenPayload) return null;

    try {
      const user = await User.findOne(tokenPayload.userId);
      return user;
    } catch (error) {
      console.log('error ', error);
      return null;
    }
  }

  @Mutation(() => User)
  async signup(@Arg('email') email: string, @Arg('password') password: string) {
    try {
      const findUser = await User.findOne({ email });

      if (findUser) {
        throw new Error('User with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const username = email.split('@')[0];

      await User.insert({
        email,
        password: hashedPassword,
        username,
      });
      const savedUser = await User.findOne({ email });
      return savedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User with this email not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Email or password is invalid');
      }

      const accessToken = generateAccessToken(user);

      // set cookie to the response
      sendRefreshToken(res, generateRefreshToken(user));

      return { user, access_token: accessToken };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokenForUser(@Arg('userId') userId: string) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, 'tokenVersion', 1);

    return true;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    res.clearCookie(constants.ACCESS_TOKEN_SECRET);
    return true;
  }
}
