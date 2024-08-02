import { ICanUserMutatePostParams } from '../interfaces';
import { errorMessages } from './errorMessages';

export const canUserMutatePost = async ({ userId, postId, prisma }: ICanUserMutatePostParams) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return { userErrors: [{ message: errorMessages.USER_NOT_FOUND }], post: null };
  }

  const post = await prisma.post.findUnique({ where: { id: postId }});

  if (post?.authorId !== user.id) {
    return { userErrors: [{ message: errorMessages.INVALID_POST_OWNER }], post: null };
  }
};