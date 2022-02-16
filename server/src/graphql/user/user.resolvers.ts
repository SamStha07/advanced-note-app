import bcrypt from 'bcryptjs';
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { User } from '../../entity/User';
import {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
} from '../../helpers/generateToken';
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

  @Mutation(() => Boolean)
  async revokeRefreshTokenForUser(@Arg('userId') userId: string) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, 'tokenVersion', 1);

    return true;
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
}
