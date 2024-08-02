import { IContext } from '../../interfaces';

export const User = {
  posts: (parent: { id: number }, __: any, { userInfo, prisma }: IContext) => {
    const isOwnProfile = parent.id === userInfo?.userId;

    if (isOwnProfile) {
      return prisma.post.findMany({
        where: { authorId: parent.id },
        orderBy: [{ createdAt: 'desc' }],
      });
    } else {
      return prisma.post.findMany({
        where: { authorId: parent.id, published: true },
        orderBy: [{ createdAt: 'desc' }],
      });
    }
  },
};
