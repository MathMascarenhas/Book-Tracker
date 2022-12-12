import { IProfile } from 'src/profile/entities/profile.entity';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  isAdmin: boolean;
  profile: IProfile[];
}
