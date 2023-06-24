import { User } from '../../models/user.entity';
import { USER_REPOSITORY } from './constants';

export const UserProvider = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
