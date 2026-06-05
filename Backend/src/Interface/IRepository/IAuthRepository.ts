export interface IAuthRepository {
  createUser(
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<{ id: string; name: string; email: string; role: string }>;

  // findUserByEmail(email: string): Promise<{ id: string; name: string; email: string; role: string } | null>;
}
