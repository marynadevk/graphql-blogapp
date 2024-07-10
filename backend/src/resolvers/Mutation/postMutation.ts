import { IContext } from '../../interfaces/IContext';
import { IPostArgs } from '../../interfaces/IPostArgs';
import { IPostUpdateArgs } from '../../interfaces/IPostUpdateArgs';
import { IPostPayload } from '../../interfaces/IPostPayload';
import { canUserMutatePost } from '../../utils/canUserMutatePost';

export const postResolvers = {
  postCreate: async (_: any, { post }: IPostArgs, { prisma, userInfo }: IContext): Promise<IPostPayload> => {
    const { title, content } = post;

    if (!userInfo) {
      return {
        userErrors: [{ message: 'You must be logged in to create a post' }],
        post: null
      };
    }

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
          authorId: userInfo.userId
        }
      })
    };
  },

  postUpdate: async (_: any, { postId, post }: IPostUpdateArgs, { prisma, userInfo }: IContext): Promise<IPostPayload> => {
    const { title, content } = post.post;

    if (!userInfo) {
      return {
        userErrors: [{ message: 'You must be logged in to create a post' }],
        post: null
      };
    }

    const error = await canUserMutatePost({ userId: userInfo.userId, postId: Number(postId), prisma });
    if (error) return error;

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
      post: await prisma.post.update({
        where: { id: Number(postId) },
        data: {
          ...payloadToUpdate
        }
      })
    };
  },

  postDelete: async (_: any, { postId }: { postId: string }, { prisma, userInfo }: IContext): Promise<IPostPayload> => {
    if (!userInfo) {
      return {
        userErrors: [{ message: 'You must be logged in to create a post' }],
        post: null
      };
    }

    const error = await canUserMutatePost({ userId: userInfo.userId, postId: Number(postId), prisma });
    if (error) return error;

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
  },

  postPublish: async (_: any, { postId }: { postId: string }, { prisma, userInfo }: IContext): Promise<IPostPayload> => {
    if (!userInfo) {
      return {
        userErrors: [{ message: 'You must be logged in to create a post' }],
        post: null
      };
    }

    const error = await canUserMutatePost({ userId: userInfo.userId, postId: Number(postId), prisma });
    if (error) return error;

    const post = await prisma.post.findUnique({ where: { id: Number(postId) } });
    if (!post) {
      return {
        userErrors: [{ message: 'Post not found' }],
        post: null
      };
    }

    await prisma.post.update({ where: { id: Number(postId) }, data: { published: true } });

    return {
      userErrors: [],
      post,
    };
  },

  postUnPublish: async (_: any, { postId }: { postId: string }, { prisma, userInfo }: IContext): Promise<IPostPayload> => {
    if (!userInfo) {
      return {
        userErrors: [{ message: 'You must be logged in to create a post' }],
        post: null
      };
    }

    const error = await canUserMutatePost({ userId: userInfo.userId, postId: Number(postId), prisma });
    if (error) return error;

    const post = await prisma.post.findUnique({ where: { id: Number(postId) } });
    if (!post) {
      return {
        userErrors: [{ message: 'Post not found' }],
        post: null
      };
    }

    await prisma.post.update({ where: { id: Number(postId) }, data: { published: false } });

    return {
      userErrors: [],
      post,
    };
  }
};
