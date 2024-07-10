import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { Mutation, Query, Profile, Post, User } from './resolvers';
import { PrismaClient } from '@prisma/client';
import { getUserFromToken } from './utils/getUserFromToken';
import { IContext } from './interfaces/IContext';

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
  context: ({ req }): IContext => {
    const userInfo = getUserFromToken(req.headers.authorization || '');
    return {
      prisma,
      userInfo
    }
  }
});

server.listen().then(({url}) => {
  console.log(`Server ready at ${url}`);
});
