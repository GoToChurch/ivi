import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users/users.controller';


describe('AuthController', () => {
  let authController: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [],
    }).compile();

    authController = app.get<UsersController>(UsersController);
  });

  describe('root', () => {

  });
});
