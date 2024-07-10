import { IContext } from '../interfaces/IContext';

export const Query = {
    posts: (_parent: any, _args: any, { prisma }: IContext) => {
      return prisma.post.findMany({
        orderBy: [{ createdAt: 'desc' }]
      });
    },
  };
