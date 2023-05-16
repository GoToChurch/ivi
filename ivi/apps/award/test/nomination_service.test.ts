import { Test, TestingModule } from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {Award, FilmAwards, Nomination} from '@app/common';
import {AwardService} from "../src/award.service";
import {getModelToken} from "@nestjs/sequelize";



describe('Nomination service tests', () => {
    let app: INestApplication;
    let service: AwardService;
    let mockNomination;

    const mockAwardService = {
        create: jest.fn().mockReturnValue(mockNomination),
        findOne: jest.fn().mockReturnValue(mockNomination),
        findAll: jest.fn().mockReturnValue([mockNomination]),
        findByPk: jest.fn(id => {}).mockReturnValue(mockNomination),
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
        mockNomination = {
            name: "Лучший фильм",
        }
    })

    // it('create award test', () => {
    //   const spy = jest.spyOn(service, "createAward");
    //   service.createAward(mockAward);
    //   expect(spy).toHaveBeenCalled();
    // });

    it('get all nomination test', () => {
        const spy = jest.spyOn(service, "getAllNominations");
        service.getAllNominations();
        expect(spy).toHaveBeenCalled();
    });

    it('get nomination by id test', () => {
        const spy = jest.spyOn(service, "getNominationById");
        service.getNominationById(1);
        expect(spy).toHaveBeenCalled();
    });

    it('edit nomination by id test', () => {
        const spy = jest.spyOn(service, "editNomination");
        service.editNomination(mockNomination, 1);
        expect(spy).toHaveBeenCalled();
    });

    it('delete nomination by id test', () => {
        const spy = jest.spyOn(service, "deleteNomination");
        service.deleteNomination(1);
        expect(spy).toHaveBeenCalled();
    });

});

