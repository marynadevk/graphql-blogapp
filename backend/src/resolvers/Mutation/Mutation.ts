import { authResolvers } from './authMutation';
import { postResolvers } from './postMutation';

export const Mutation = {
  ...postResolvers,
  ...authResolvers,
}
