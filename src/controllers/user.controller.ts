import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthGuardian } from '../auth/auth.guardian';
import { UserDto } from '../dto/user-dto';

/**
 * User Controller
 * @date 6/24/2023
 *
 * @export
 * @class UserController
 * @typedef {UserController}
 */
@Controller('users')
export class UserController {
  /**
   * Creates an instance of UserController.
   * @date 6/24/2023
   *
   * @constructor
   * @param {UserService} UserService
   */
  constructor(private UserService: UserService) {}

  /**
   * Return list of all Users
   * @date 6/24/2023
   *
   * @returns {unknown}
   */
  @UseGuards(AuthGuardian)
  @Get('/list')
  getUsers() {
    return this.UserService.getUsers();
  }

  /**
   * CREATE new User
   * @date 6/24/2023
   *
   * @param {UserDto} user
   * @returns {*}
   */
  @UseGuards(AuthGuardian)
  @Post()
  createUser(@Body() user: UserDto) {
    console.log(user);
    return this.UserService.createUser(user);
  }

  /**
   * READ User by id
   * @date 6/24/2023
   *
   * @param {number} id
   * @returns {*}
   */
  @UseGuards(AuthGuardian)
  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.UserService.findOneById(id);
  }

  /**
   * UPDATE User by id
   * @date 6/24/2023
   *
   * @param {UserDto} user
   * @returns {unknown}
   */
  @UseGuards(AuthGuardian)
  @Put()
  updateUser(
    @Body()
    user: UserDto,
  ) {
    return this.UserService.updateUser(user);
  }

  /**
   * DELETE User by id
   * @date 6/24/2023
   *
   * @param {number} id
   * @returns {unknown}
   */
  @UseGuards(AuthGuardian)
  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.UserService.deleteUser(id);
  }
}
