export interface IUserEntity {
  id: string;
  name: string;
  email: string;
  password?: string;
  cpf: string;
  isPremium: boolean;
}
