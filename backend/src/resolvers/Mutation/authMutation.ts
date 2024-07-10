import { IContext } from '../../interfaces/IContext';
import { ISignUpArgs } from '../../interfaces/ISignUpArgs';
import { IUserPayload } from '../../interfaces/IUserPayload';
import validator from 'validator';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import { ISignInArgs } from '../../interfaces/ISignInArgs';

export const authResolvers = {
  signUp: async (
    parent: any,
    { name, credentials, bio }: ISignUpArgs,
    { prisma }: IContext
  ): Promise<IUserPayload> => {
    const { email, password } = credentials;
    const isValidPassword = validator.isLength(password, {min: 5, max: 15});

    if (!validator.isEmail(email)) {
      return {userErrors: [{message: 'Email is invalid'}], token: null};
    }

    if(!isValidPassword) {
      return {userErrors: [{message: 'Password must be between 5 and 15 characters'}], token: null};
    }

    if(!name || !bio) {
      return {userErrors: [{message: 'Name and bio are required'}], token: null};
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { name, email, password: hashedPassword }});

    await prisma.profile.create({ data: { bio, userId: user.id } });

    const token = JWT.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '24h' })

    return {userErrors: [], token};
  },

  signIn: async (
    parent: any,
    { credentials }: ISignInArgs,
    { prisma }: IContext
  ): Promise<IUserPayload> => {
    const { email, password } = credentials;
    const user = await prisma.user.findUnique({ where: { email }});

    if(!user) {
      return {userErrors: [{ message: 'Invalid credentials' }], token: null};
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      return {userErrors: [{ message: 'Invalid credentials' }], token: null};
    }

    const token = JWT.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '24h' });

    return {userErrors: [], token};
  }
};
