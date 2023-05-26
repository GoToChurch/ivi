import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from "@nestjs/sequelize";
import {
    CreatePersonDto,
    CreateProfessionDto,
    Film,
    Person,
    PersonFilms,
    Profession,
    UpdatePersonDto
} from "@app/common";
import {PersonService} from "../src/services/person.service";
import {ProfessionService} from "../src/services/profession.service";


describe('Testing PersonService', () => {
    let service: PersonService;
    let person: Person;

    const mockPersonService = {
        createPerson: jest.fn((dto: CreatePersonDto) => {
            return {
                ...person,
                id: 1,
                name: dto.name,
                originalName: dto.originalName,
                photo: dto.photo
            }
        }),
        getOrCreatePerson: jest.fn((dto: CreatePersonDto) => {
            return {
                ...person,
                id: 1,
                name: dto.name,
                originalName: dto.originalName,
                photo: dto.photo
            }
        }),
        getAllPersons: jest.fn(() => []),
        getPersonById: jest.fn((id = 1) => {
            return {
                ...person,
                id: 1
            }
        }),
        getPersonByName: jest.fn((name = 'someName') => {
            return {
                ...person,
                name: name
            }
        }),
        searchPersons: jest.fn((query = {}) => {
            return []
        }),
        filterPersonsByProfession: jest.fn((persons = ['person1', 'person2'], profession = 'актёр') => {
            return []
        }),
        getAllPersonsFilms: jest.fn((id = 1) => {
            return []
        }),
        getAllPersonsFilmsByProfession: jest.fn((personId = 1, professionId = 1) => {
            return []
        }),
        getAllPersonsProfessions: jest.fn((id = 1) => {
            return []
        }),
        editPerson: jest.fn((dto: UpdatePersonDto, id= 1) => {
            return {
                ...person,
                id: 1,
                name: dto.name,
                originalName: dto.originalName,
                photo: dto.photo
            }
        }),
        deletePerson: jest.fn((id = 1) => {
            return true
        }),
        addFilmForPerson: jest.fn((dto: CreatePersonDto, film: Film) => {
            return {
                ... film,
                name: dto.name,
                originalName: dto.originalName,
                photo: dto.photo
            }
        }),
        addProfessionInFilmForPerson: jest.fn((film: Film, person: Person, profession: Profession) => {
            return {}
        }),
        createPersonFilm: jest.fn((filmId = 1, personId = 1, professionId = 1): void => {}),
        addProfessionForPerson: jest.fn((personId = 1, dto: CreateProfessionDto) => {
            return {
                ...person,
                id: personId,
                professions: [1]
            }
        }),
        addProfessionsForPerson: jest.fn((person: Person, professions = [1, 2]): void => {})
    }

    const mockPersonRepo = {}

    const mockProfessionRepo = {};

    const mockPersonFilmsRepo = {}

    const mockClientProxy = {}

    const mockProfessionService = {}

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                PersonService, {
                  provide: PersonService,
                  useValue: mockPersonService
                }, {
                    provide: getModelToken(Person),
                    useValue: mockPersonRepo
                }, {
                    provide: getModelToken(Profession),
                    useValue: mockProfessionRepo
                }, {
                    provide: getModelToken(PersonFilms),
                    useValue: mockPersonFilmsRepo
                }, {
                    provide: 'FILM',
                    useValue: mockClientProxy
                }, {
                    provide: ProfessionService,
                    useValue: mockProfessionService
                }
            ],
        }).compile();

        service = app.get<PersonService>(PersonService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    it("calling createPerson method", () => {
        const spy = jest.spyOn(service, "createPerson");
        const dto = {
            name: 'someName',
            originalName: 'someName',
            photo: 'photo'
        };
        service.createPerson(dto);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.createPerson(dto));
    })

    it("calling getOrCreatePerson method", () => {
        const spy = jest.spyOn(service, "getOrCreatePerson");
        const dto = {
            name: 'someName',
            originalName: 'someName',
            photo: 'photo'
        };
        service.getOrCreatePerson(dto);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getOrCreatePerson(dto));
    })

    it("calling getAllPersons method", () => {
        const spy = jest.spyOn(service, "getAllPersons");
        service.getAllPersons();
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getAllPersons());
    })

    it("calling getPersonByName method", () => {
        const spy = jest.spyOn(service, "getPersonByName");
        const name = "someName";
        service.getPersonByName(name);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getPersonByName(name));
    })

    it("calling getPersonById method", () => {
        const spy = jest.spyOn(service, "getPersonById");
        const id = 1;
        service.getPersonById(id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getPersonById(id));
    })

    it("calling searchPersons method", () => {
        const spy = jest.spyOn(service, "searchPersons");
        const query = {};
        service.searchPersons(query);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.searchPersons(query));
    })

    it("calling filterPersonsByProfession method", () => {
        const spy = jest.spyOn(service, "filterPersonsByProfession");
        const persons = ['person1', 'person2'];
        const profession = 'актёр';
        service.filterPersonsByProfession(persons, profession);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.filterPersonsByProfession(persons, profession));
    })

    it("calling getAllPersonsFilms method", () => {
        const spy = jest.spyOn(service, "getAllPersonsFilms");
        const id = 1;
        service.getAllPersonsFilms(id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getAllPersonsFilms(id));
    })

    it("calling getAllPersonsFilmsByProfession method", () => {
        const spy = jest.spyOn(service, "getAllPersonsFilmsByProfession");
        const personId = 1;
        const professionId = 1;
        service.getAllPersonsFilmsByProfession(personId, professionId);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getAllPersonsFilmsByProfession(personId, professionId));
    })

    it("calling getAllPersonsProfessions method", () => {
        const spy = jest.spyOn(service, "getAllPersonsProfessions");
        const id = 1;
        service.getAllPersonsProfessions(id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getAllPersonsProfessions(id));
    })

    it("calling editPerson method", () => {
        const spy = jest.spyOn(service, "editPerson");
        const dto = {
            name: "someName",
            originalName: "someName",
            photo: "somePhoto"
        }
        const id = 1;
        service.editPerson(dto, id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.editPerson(dto, id));
    })

    it("calling deletePerson method", () => {
        const spy = jest.spyOn(service, "deletePerson");
        const id = 1;
        service.deletePerson(id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.deletePerson(id));
    })

    it("calling addFilmForPerson method", () => {
        const spy = jest.spyOn(service, "addFilmForPerson");
        const dto = {
            name: "someName",
            originalName: "someName",
            photo: "somePhoto"
        };
        let film: Film;
        service.addFilmForPerson(dto, film);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.addFilmForPerson(dto, film));
    })

    it("calling addProfessionInFilmForPerson method", () => {
        const spy = jest.spyOn(service, "addProfessionInFilmForPerson");
        let film: Film;
        let person: Person;
        let profession: Profession;
        service.addProfessionInFilmForPerson(film, person, profession);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.addProfessionInFilmForPerson(film, person, profession));
    })

    it("calling createPersonFilm method", () => {
        const spy = jest.spyOn(service, "createPersonFilm");
        const filmId = 1;
        const personId = 1;
        const professionId = 1;
        service.createPersonFilm(filmId, personId, professionId);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.createPersonFilm(filmId, personId, professionId));
    })

    it("calling addProfessionForPerson method", () => {
        const spy = jest.spyOn(service, "addProfessionForPerson");
        const personId = 1;
        const dto = {
            name: 'someName'
        };
        service.addProfessionForPerson(personId, dto);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.addProfessionForPerson(personId, dto));
    })

    it("calling addProfessionsForPerson method", () => {
        const spy = jest.spyOn(service, "addProfessionsForPerson");
        let person: Person;
        const professions = [1, 2];
        service.addProfessionsForPerson(person, professions);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.addProfessionsForPerson(person, professions));
    })
});