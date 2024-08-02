import validator from 'validator';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import {
  IContext,
  ISignUpArgs,
  IUserPayload,
  ISignInArgs,
} from '../../interfaces';
import { config, validationConfig } from '../../config';
import { errorMessages } from '../../utils/errorMessages';

export const authResolvers = {
  signUp: async (
    parent: any,
    { name, credentials, bio }: ISignUpArgs,
    { prisma }: IContext
  ): Promise<IUserPayload> => {
    const { email, password } = credentials;
    const isValidPassword = validator.isLength(password, {
      min: validationConfig.PASSWORD_MIN_LENGTH,
      max: validationConfig.PASSWORD_MAX_LENGTH,
    });

    if (!validator.isEmail(email)) {
      return {
        userErrors: [{ message: errorMessages.INVALID_EMAIL }],
        token: null,
        userId: null,
      };
    }

    if (!isValidPassword) {
      return {
        userErrors: [{ message: errorMessages.ERROR_PASSWORD_LENGTH }],
        token: null,
        userId: null,
      };
    }

    if (!name || !bio) {
      return {
        userErrors: [{ message: errorMessages.REQUIRED_AUTH_FIELDS }],
        token: null,
        userId: null,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    await prisma.profile.create({ data: { bio, userId: user.id } });

    const token = JWT.sign({ userId: user.id }, config.jwt.secret as string, {
      expiresIn: config.token.expire,
    });

    return { userErrors: [], token, userId: user.id };
  },

  signIn: async (
    parent: any,
    { credentials }: ISignInArgs,
    { prisma }: IContext
  ): Promise<IUserPayload> => {
    const { email, password } = credentials;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return {
        userErrors: [{ message: errorMessages.INVALID_CREDENTIALS }],
        token: null,
        userId: null,
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        userErrors: [{ message: errorMessages.INVALID_CREDENTIALS }],
        token: null,
        userId: null,
      };
    }

    const token = JWT.sign({ userId: user.id }, config.jwt.secret as string, {
      expiresIn: config.token.expire,
    });

    return { userErrors: [], token, userId: user.id };
  },
};
