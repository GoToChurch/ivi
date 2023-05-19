import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class Current_user_or_admin_guard implements CanActivate {

    constructor(private jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            if (req.headers.authorization) {
                const authHeader = req.headers.authorization;
                const bearer = authHeader.split(' ')[0];
                const token = authHeader.split(' ')[1];
                if (bearer !== 'Bearer' || !token) {
                    throw new UnauthorizedException({message: 'Пользователь не авторизован'})
                }
                const user = this.jwtService.decode(token);
                req.user = user
                const admin = req.user['roles'].filter(role => role === "ADMIN" || role === "SUPERUSER")
                if (+req.user['sub'] === +req.params['id'] || req.user['email'] === req.params['email'] ||
                    req.user['phone'] === req.params['phone'] || admin.length > 0) {
                    return true;
                }
            }
            if (req.user.id === +req.params['id'] || req.user.email === req.params['email'] ||
                req.user.phone === req.params['phone']) {
                return true;
            }
        } catch (err) {
            throw new UnauthorizedException({message: 'Вам нужно авторизоваться'})
        }
    }
}