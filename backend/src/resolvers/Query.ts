import { IContext } from '../interfaces/IContext';

export const Query = {
  me: (_: any, __: any, { prisma, userInfo }: IContext) => {
    if (!userInfo) return null;
    return prisma.user.findUnique({
      where: { id: userInfo.userId }
    });
  },
  profile: (_: any, { userId }: { userId: string}, { prisma }: IContext) => {
    return prisma.profile.findUnique({
      where: { userId: Number(userId) }
    });
  },
  posts: (_: any, __: any, { prisma }: IContext) => {
    return prisma.post.findMany({
      orderBy: [{ createdAt: 'desc' }]
    });
  },
};
