import { Test, TestingModule } from '@nestjs/testing';
import { AwardController } from './award.controller';
import { AwardService } from './award.service';

describe('AwardController', () => {
  let awardController: AwardController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AwardController],
      providers: [AwardService],
    }).compile();

    awardController = app.get<AwardController>(AwardController);
  });

  //describe('root', () => {
  //  it('should return "Hello World!"', () => {
  //    expect(awardController.getHello()).toBe('Hello World!');
   // });
  //});
});
