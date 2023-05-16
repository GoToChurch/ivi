import { Test, TestingModule } from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {Award, FilmAwards, Nomination} from '@app/common';
import {AwardService} from "../src/award.service";
import {getModelToken} from "@nestjs/sequelize";



describe('Award service tests', () => {
  let app: INestApplication;
  let service: AwardService;
  let mockAward;

  const mockAwardService = {
    create: jest.fn().mockReturnValue(mockAward),
    findOne: jest.fn().mockReturnValue(mockAward),
    findAll: jest.fn().mockReturnValue([mockAward]),
    findByPk: jest.fn(id => {}).mockReturnValue(mockAward),
    update: jest.fn(),
    destroy: jest.fn()
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [AwardService,
        {
          provide: getModelToken(Award),
          useValue: mockAwardService
        },
        {
          provide: getModelToken(FilmAwards),
          useValue: mockAwardService
        },
        {
          provide: getModelToken(Nomination),
          useValue: mockAwardService
        }
      ],
    }).compile();

    service = moduleFixture.get<AwardService>(AwardService);
  });

  beforeEach(() => {
    mockAward = {
      name: "Оскар",
      year: 2023
    }
  })

  // it('create award test', () => {
  //   const spy = jest.spyOn(service, "createAward");
  //   service.createAward(mockAward);
  //   expect(spy).toHaveBeenCalled();
  // });

  it('get all awards test', () => {
      const spy = jest.spyOn(service, "getAllAwards");
      service.getAllAwards();
      expect(spy).toHaveBeenCalled();
  });

  it('get award by id test', () => {
    const spy = jest.spyOn(service, "getAwardById");
    service.getAwardById(1);
    expect(spy).toHaveBeenCalled();
  });

  it('get award by name and year test', () => {
    const spy = jest.spyOn(service, "getAwardByNameAndYear");
    service.getAwardByNameAndYear("Оскар", 2023);
    expect(spy).toHaveBeenCalled();
  });

  it('edit award by id test', () => {
    const spy = jest.spyOn(service, "editAward");
    service.editAward(mockAward, 1);
    expect(spy).toHaveBeenCalled();
  });


  it('delete award by id test', () => {
    const spy = jest.spyOn(service, "deleteAward");
    service.deleteAward(1);
    expect(spy).toHaveBeenCalled();
  });

});

