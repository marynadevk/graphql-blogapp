export interface IUserPayload {
  userErrors: { message: string }[];
  token: string | null;
}