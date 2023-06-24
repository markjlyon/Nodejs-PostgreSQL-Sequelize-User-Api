import { User } from '../../models/user.entity';
import { USER_REPOSITORY } from './constants';

/**
 * User Provider and Repository
 * @date 6/24/2023
 *
 * @type {{}}
 */
export const UserProvider = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
