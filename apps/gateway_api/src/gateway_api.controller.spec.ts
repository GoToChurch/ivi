import { Test, TestingModule } from '@nestjs/testing';
import { UsersGatewayApiController} from "./Controllers/users_gateway_api.controller";


describe('GatewayApiController', () => {
  let gatewayApiController: UsersGatewayApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersGatewayApiController],
      providers: [],
    }).compile();

    gatewayApiController = app.get<UsersGatewayApiController>(UsersGatewayApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {

    });
  });
});
