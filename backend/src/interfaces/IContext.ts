import { PrismaClient, Prisma } from '@prisma/client';

export interface IContext {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never>;
  userInfo: { userId: number } | null;
}