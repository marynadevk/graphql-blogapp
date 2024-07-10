import { IContext } from '../../interfaces/IContext';
import { IPostArgs } from '../../interfaces/IPostArgs';
import { IPostUpdateArgs } from '../../interfaces/IPostUpdateArgs';
import { IPostPayload } from '../../interfaces/IPostPayload';

export const Mutation = {
  postCreate: async (parent: any, { post }: IPostArgs, { prisma }: IContext): Promise<IPostPayload> => {
    const { title, content } = post;
    if (!title || !content) {
      return {
        userErrors: [{ message: 'Title and content are required for creating a post' }],
        post: null
      };
    }
    return {
      userErrors: [],
      post: await prisma.post.create({
        data: {
          title,
          content,
          authorId: 1
        }
      })
    };
  },

  postUpdate: (parent: any, { postId, post }: IPostUpdateArgs, { prisma }: IContext) => {
    const { title, content } = post.post;
    if (!title && !content) {
      return {
        userErrors: [{ message: 'Title or content is required for updating a post' }],
        post: null
      };
    };

    const existingPost = prisma.post.findUnique({ where: { id: Number(postId) } });
    if (!existingPost) {
      return {
        userErrors: [{ message: 'Post not found' }],
        post: null
      };
    };

    let payloadToUpdate: { title?: string; content?: string } = {};
    if (title) payloadToUpdate.title = title;
    if (content) payloadToUpdate.content = content;

    return {
      userErrors: [],
      post: prisma.post.update({
        where: { id: Number(postId) },
        data: {
          ...payloadToUpdate
        }
      })
    };
  },

  postDelete: async (parent: any, { postId }: { postId: string }, { prisma }: IContext): Promise<IPostPayload> => {
    const post = await prisma.post.findUnique({ where: { id: Number(postId) } });
    if (!post) {
      return {
        userErrors: [{ message: 'Post not found' }],
        post: null
      };
    }
    await prisma.post.delete({ where: { id: Number(postId) } });

    return {
      userErrors: [],
      post,
    };
  }
}