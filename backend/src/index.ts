import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { PrismaClient } from '@prisma/client';
import { getUserFromToken } from './utils/getUserFromToken';
import { IContext } from './interfaces';
import { Mutation } from './resolvers/mutation';
import { Profile, User, Query } from './resolvers/user';
import { Post } from './resolvers/post/post.resolver';

export const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers : {
    Query,
    Mutation,
    Profile,
    Post,
    User
  },
  context: async ({ req }: any): Promise<IContext> => {
    const userInfo = await getUserFromToken(req.headers.authorization);
    return { prisma, userInfo };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
