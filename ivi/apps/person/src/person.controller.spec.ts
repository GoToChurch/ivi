import { Test, TestingModule } from '@nestjs/testing';
import { PersonController } from './controllers/person.controller';
import { PersonService } from './services/person.service';

describe('PersonController', () => {
  let personController: PersonController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [PersonService],
    }).compile();

    personController = app.get<PersonController>(PersonController);
  });

  //describe('root', () => {
  //  it('should return "Hello World!"', () => {
  //    expect(personController.getHello()).toBe('Hello World!');
  //  });
  //});
});
