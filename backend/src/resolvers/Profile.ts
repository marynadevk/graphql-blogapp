import { IContext } from '../interfaces/IContext';
import { IProfileParent } from '../interfaces/IProfileParent';

export const Profile = {
  user: (parent: IProfileParent, __: any, { prisma }: IContext) => {
    return prisma.user.findUnique({
      where: { id: parent.userId },
    });
  },
};
