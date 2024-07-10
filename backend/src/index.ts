import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { Mutation, Query } from './resolvers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers : {
    Query,
    Mutation
  },
  context: {
    prisma
  }
});

server.listen().then(({url}) => {
  console.log(`Server ready at ${url}`);
});
