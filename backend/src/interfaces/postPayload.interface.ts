import { Post } from '@prisma/client';

export interface IPostPayload {
  userErrors: { message: string }[];
  post: Post | null;
}