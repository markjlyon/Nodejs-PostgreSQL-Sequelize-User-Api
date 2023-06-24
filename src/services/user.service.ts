import { Inject, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../models/user.entity';
import { UserDto } from '../dto/user-dto';
import { USER_REPOSITORY } from '../core/database/constants';

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  /* READ user for Auth */
  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email: email },
    });
  }

  /* READ user list */
  async getUsers() {
    return await this.userRepository.findAll<User>();
  }

  /* READ user by id */
  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  /* CREATE user */
  async createUser(user: UserDto): Promise<User> {
    ValidateUser(user);
    let hashword;
    bcrypt.hash(user.password, process.env.SALT, function (err, hash) {
      hashword = hash;
    });
    return await this.userRepository.create<User>({
      email: user.email,
      name: user.name,
      password: hashword,
    });
  }

  /* UPDATE user */
  async updateUser(user: UserDto) {
    ValidateUser(user);
    return await this.userRepository.update<User>(user, {
      where: { id: user.id },
    });
  }

  /* DELETE user by id */
  async deleteUser(id: number) {
    return await this.userRepository.destroy<User>({
      where: { id: id },
    });
  }
}

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
