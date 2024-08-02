import { IPostArgs } from './postArgs.interface';

export interface IPostUpdateArgs extends IPostArgs {
  postId: string;
}
