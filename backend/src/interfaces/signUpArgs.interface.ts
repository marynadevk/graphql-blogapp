export interface ISignUpArgs {
  name: string;
  credentials: {
    email: string;
    password: string;
  };
  bio: string;
}
