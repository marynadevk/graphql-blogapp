import { IContext } from './IContext';

export interface ICanUserMutatePostParams {
  userId: number;
  postId: number;
  prisma: IContext['prisma'];
}
