import { userLoader } from '../loaders/userLoader';

export const Post = {
  user: (parent: { authorId: number }, __: any) => {
    return userLoader.load(parent.authorId);
  },
};
