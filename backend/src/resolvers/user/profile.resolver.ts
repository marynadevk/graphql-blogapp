import { IContext, IProfileParent } from '../../interfaces';

export const Profile = {
  user: (parent: IProfileParent, __: any, { prisma }: IContext) => {
    return prisma.user.findUnique({
      where: { id: parent.userId },
    });
  },
};
