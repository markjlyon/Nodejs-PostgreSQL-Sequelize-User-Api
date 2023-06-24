import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';

describe('tblUserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  describe('root', () => {
    it('UserController should be defined', () => {
      expect(UserController).toBeDefined();
    });
  });
});
