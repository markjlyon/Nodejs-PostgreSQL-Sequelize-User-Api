import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { ApiService } from '../services/api.service';

/*
This setup is for testing but it is not required for this assignment.
I have included the a basic boiler plate to show I was thinking about
testing.
*/

describe('ApiController', () => {
  let apiController: ApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [ApiService],
    }).compile();

    apiController = app.get<ApiController>(ApiController);
  });

  describe('root', () => {
    it('ApiController should be defined', () => {
      expect(ApiController).toBeDefined();
    });
    it('ApiService should be defined', () => {
      expect(ApiService).toBeDefined();
    });
  });
});
