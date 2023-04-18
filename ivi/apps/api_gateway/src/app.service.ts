import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Film} from "../../film/src/models/films_models/films/films.model";
import {PersonService} from "../../film/src/services/person.service";
import {GenreService} from "../../film/src/services/genre.service";

@Injectable()
export class AppService {
    constructor() {}

    getDirectors() {
        return ['John Doe']
    }
}