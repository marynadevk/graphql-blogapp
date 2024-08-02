import JWT from 'jsonwebtoken';
import { config } from '../config';

export const getUserFromToken = (token: string) => {
  try {
    return JWT.verify(token, config.jwt.secret as string) as {
      userId: number;
    };
  } catch (error) {
    return null;
  }
};