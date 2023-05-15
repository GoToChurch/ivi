import { Test, TestingModule } from '@nestjs/testing';
import { FilmController } from './controllers/film.controller';
import { FilmService } from './services/film.service';

describe('FilmController', () => {
  let filmController: FilmController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FilmController],
      providers: [FilmService],
    }).compile();

    filmController = app.get<FilmController>(FilmController);
  });

  describe('root', () => {

  });
});
