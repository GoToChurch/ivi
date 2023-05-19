import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class Current_user_guard implements CanActivate {

    constructor(private jwtService: JwtService) {
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован!!!!!'})
            }
            const user = this.jwtService.decode(token);
            req.user = user;
            if (req.user['sub'] === req.body.id) {
                return true;
            }
            throw new UnauthorizedException({message: 'У Вас нет прав на взаимодействие с этим пользователем'})
        } catch (err) {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }
    }

}