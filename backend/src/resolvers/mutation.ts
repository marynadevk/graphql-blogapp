import { authResolvers } from './auth/authMutation.resolver';
import { postResolvers } from './post/postMutation.resolver';

export const Mutation = {
  ...postResolvers,
  ...authResolvers,
}
