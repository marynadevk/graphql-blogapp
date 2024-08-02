import { IContext } from './context.interface';

export interface ICanUserMutatePostParams {
  userId: number;
  postId: number;
  prisma: IContext['prisma'];
}
