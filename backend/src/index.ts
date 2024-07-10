import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { Mutation, Query } from './resolvers';
import { PrismaClient } from '@prisma/client';
import { getUserFromToken } from './utils/getUserFromToken';
import { IContext } from './interfaces/IContext';

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers : {
    Query,
    Mutation
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
