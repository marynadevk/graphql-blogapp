import {
  IContext,
  IPostArgs,
  IPostUpdateArgs,
  IPostPayload,
} from '../../interfaces';
import { canUserMutatePost } from '../../utils/canUserMutatePost';
import { errorMessages } from '../../utils/errorMessages';

export const postResolvers = {
  postCreate: async (
    _: any,
    { post }: IPostArgs,
    { prisma, userInfo }: IContext
  ): Promise<IPostPayload> => {
    const { title, content } = post;

    if (!userInfo) {
      return {
        userErrors: [{ message: errorMessages.UNAUTHORIZED }],
        post: null,
      };
    }

    if (!title || !content) {
      return {
        userErrors: [{ message: errorMessages.REQUIRED_POST_FIELDS }],
        post: null,
      };
    }

    return {
      userErrors: [],
      post: await prisma.post.create({
        data: {
          title,
          content,
          authorId: userInfo.userId,
        },
      }),
    };
  },

  postUpdate: async (
    _: any,
    { postId, post }: IPostUpdateArgs,
    { prisma, userInfo }: IContext
  ): Promise<IPostPayload> => {
    const { title, content } = post;

    if (!userInfo) {
      return {
        userErrors: [{ message: errorMessages.UNAUTHORIZED }],
        post: null,
      };
    }

    const error = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma,
    });
    if (error) return error;

    if (!title && !content) {
      return {
        userErrors: [{ message: errorMessages.REQUIRED_UPDATE_POST_FIELDS }],
        post: null,
      };
    }

    const existingPost = prisma.post.findUnique({
      where: { id: Number(postId) },
    });
    if (!existingPost) {
      return {
        userErrors: [{ message: errorMessages.POST_NOT_FOUND }],
        post: null,
      };
    }

    let payloadToUpdate: { title?: string; content?: string } = {};
    if (title) payloadToUpdate.title = title;
    if (content) payloadToUpdate.content = content;

    return {
      userErrors: [],
      post: await prisma.post.update({
        where: { id: Number(postId) },
        data: {
          ...payloadToUpdate,
        },
      }),
    };
  },

  postDelete: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: IContext
  ): Promise<IPostPayload> => {
    if (!userInfo) {
      return {
        userErrors: [{ message: errorMessages.UNAUTHORIZED }],
        post: null,
      };
    }

    const error = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma,
    });
    if (error) return error;

    const post = await prisma.post.findUnique({
      where: { id: Number(postId) },
    });
    if (!post) {
      return {
        userErrors: [{ message: errorMessages.POST_NOT_FOUND }],
        post: null,
      };
    }

    await prisma.post.delete({ where: { id: Number(postId) } });

    return {
      userErrors: [],
      post,
    };
  },

  postPublish: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: IContext
  ): Promise<IPostPayload> => {
    if (!userInfo) {
      return {
        userErrors: [{ message: errorMessages.UNAUTHORIZED }],
        post: null,
      };
    }

    const error = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma,
    });
    if (error) return error;

    const post = await prisma.post.findUnique({
      where: { id: Number(postId) },
    });
    if (!post) {
      return {
        userErrors: [{ message: errorMessages.POST_NOT_FOUND }],
        post: null,
      };
    }

    await prisma.post.update({
      where: { id: Number(postId) },
      data: { published: true },
    });

    return {
      userErrors: [],
      post,
    };
  },

  postUnPublish: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: IContext
  ): Promise<IPostPayload> => {
    if (!userInfo) {
      return {
        userErrors: [{ message: errorMessages.UNAUTHORIZED }],
        post: null,
      };
    }

    const error = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma,
    });
    if (error) return error;

    const post = await prisma.post.findUnique({
      where: { id: Number(postId) },
    });
    if (!post) {
      return {
        userErrors: [{ message: errorMessages.POST_NOT_FOUND }],
        post: null,
      };
    }

    await prisma.post.update({
      where: { id: Number(postId) },
      data: { published: false },
    });

    return {
      userErrors: [],
      post,
    };
  },
};
