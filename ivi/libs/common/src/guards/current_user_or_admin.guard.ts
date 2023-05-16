import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class CurrentUserOrAdminGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            if (req.headers.authorization) {
                const authHeader = req.headers.authorization;
                const bearer = authHeader.split(' ')[0];
                const token = authHeader.split(' ')[1];

                if (bearer !== 'Bearer' || !token) {
                    throw new UnauthorizedException({message: 'Пользователь не авторизован!!!!!'})
                }

                req.user = this.jwtService.verify(token, {secret: process.env.JWT_SECRET});

                const roles = req.user.roles.map(role => role.value);
                const admin = roles.filter(role => role === "ADMIN" || role === "SUPERUSER")

                if (req.user.id === +req.params['id'] || req.user.email === req.params['email'] ||
                    req.user.phone === req.params['phone'] || admin.length > 0) {
                    return true;
                }
            }
            if (req.user.id === +req.params['id'] || req.user.email === req.params['email'] ||
                req.user.phone === req.params['phone']) {
                return true;
            }
        } catch (err) {
            console.log(err)
            throw new UnauthorizedException({message: "У вас нет прав на взаимодействие с этим пользователем"})
        }
    }
}