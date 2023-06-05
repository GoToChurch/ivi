import {CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {lastValueFrom, Observable} from "rxjs";
import {ClientProxy} from "@nestjs/microservices";


@Injectable()
export class LogoutGuard implements CanActivate {
    constructor() {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const res = context.switchToHttp().getResponse();

        res.cookie("Role", "", {
            httpOnly: true,
            origin: '*',
            credentials: true
        })

        res.cookie("RefreshToken", "", {
            httpOnly: true,
            origin: '*',
            credentials: true
        })

        return true;
    }
}