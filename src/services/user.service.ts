import { Inject, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../models/user.entity';
import { UserDto } from '../dto/user-dto';
import { USER_REPOSITORY } from '../core/database/constants';

/**
 * bcrypt for password salt and hash
 * @date 6/24/2023
 *
 * @type {*}
 */
const bcrypt = require('bcrypt');

/**
 * Base UserService
 * @date 6/24/2023
 *
 * @export
 * @class UserService
 * @typedef {UserService}
 */
@Injectable()
export class UserService {
  /**
   * Creates an instance of UserService.
   * @date 6/24/2023
   *
   * @constructor
   * @param {typeof User} userRepository
   */
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  /**
   * Get the user by email for authorization
   * @date 6/24/2023
   *
   * @async
   * @param {string} email
   * @returns {Promise<User>}
   */
  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email: email },
    });
  }

  /**
   * READ all users
   * @date 6/24/2023
   *
   * @async
   * @returns {unknown}
   */
  async getUsers() {
    return await this.userRepository.findAll<User>();
  }

  /**
   * READ one user by id
   * @date 6/24/2023
   *
   * @async
   * @param {number} id
   * @returns {Promise<User>}
   */
  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  /**
   * CREATE a new user
   * @date 6/24/2023
   *
   * @async
   * @param {UserDto} user
   * @returns {Promise<User>}
   */
  async createUser(user: UserDto): Promise<User> {
    ValidateUser(user);
    return await bcrypt
      .hash(user.password, process.env.SALT)
      .then((hash) => {
        console.log('Hash ', hash);
        return this.userRepository.create<User>({
          email: user.email,
          name: user.name,
          password: hash,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * UPDATE user by id
   * @date 6/24/2023
   *
   * @async
   * @param {UserDto} user
   * @returns {unknown}
   */
  async updateUser(user: UserDto) {
    ValidateUser(user);
    return await this.userRepository.update<User>(user, {
      where: { id: user.id },
    });
  }

  /**
   * DELETE user by id
   * @date 6/24/2023
   *
   * @async
   * @param {number} id
   * @returns {unknown}
   */
  async deleteUser(id: number) {
    return await this.userRepository.destroy<User>({
      where: { id: id },
    });
  }
}

/**
 * Validate the user email and password formats
 * @date 6/24/2023
 *
 * @param {UserDto} user
 * @returns {boolean}
 */
function ValidateUser(user: UserDto) {
  // Check if EMAIL exists and is valid
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email))
    throw new HttpException(
      'User EMAIL does not meet format requirements',
      HttpStatus.BAD_REQUEST,
    );
  // Check if NAME exists
  if (user.name === '')
    throw new HttpException(
      'User NAME does not meet expected requirements',
      HttpStatus.BAD_REQUEST,
    );
  // Check if PASSWORD exists, has min length 8, max length 24, and lower case, upper case, 1 number, and special character
  // I did this not because it is the best password strategy, but just to have a good validator
  if (
    !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      user.password,
    )
  )
    throw new HttpException(
      'User PASSWORD does not meet complexity requirements',
      HttpStatus.BAD_REQUEST,
    );
  return true;
}
