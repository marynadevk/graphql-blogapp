import Dataloader from 'dataloader';
import { User } from '@prisma/client';
import { prisma } from '..';

const batchUsers = async (ids: number[]): Promise<User[]> => {
  const users = await prisma.user.findMany({ where: { id: { in: ids } } });
  const userMap: { [key: string]: User } = {};

  users.forEach((user: User) => { userMap[user.id] = user });

  return ids.map((id) => userMap[id]);
};

//@ts-ignore
export const userLoader = new Dataloader<number, User>(batchUsers);
