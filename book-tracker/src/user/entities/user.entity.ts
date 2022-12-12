import { IProfile } from 'src/profile/entities/profile.entity';

export interface IUserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  isAdmin: boolean;
  profiles: IProfile[];
}
