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

@Controller('users')
export class UserController {
  constructor(private UserService: UserService) {}

  /* Bonus feature! */
  @UseGuards(AuthGuardian)
  @Get('/list')
  getUsers() {
    return this.UserService.getUsers();
  }

  /* CREATE */
  @UseGuards(AuthGuardian)
  @Post()
  createUser(@Body() user: UserDto) {
    console.log(user);
    return this.UserService.createUser(user);
  }

  /* READ */
  @UseGuards(AuthGuardian)
  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.UserService.findOneById(id);
  }

  /* UPDATE */
  @UseGuards(AuthGuardian)
  @Put()
  updateUser(
    @Body()
    user: UserDto,
  ) {
    return this.UserService.updateUser(user);
  }

  /* DELETE */
  @UseGuards(AuthGuardian)
  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.UserService.deleteUser(id);
  }
}
