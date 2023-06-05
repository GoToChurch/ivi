import {CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {lastValueFrom, Observable} from "rxjs";
import {ClientProxy} from "@nestjs/microservices";


@Injectable()
export class LoginGuard implements CanActivate {
    constructor(@Inject("USERS") private authClient: ClientProxy) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const res = context.switchToHttp().getResponse();
        const req = context.switchToHttp().getRequest();

        const user = lastValueFrom(this.authClient.send({
            cmd: "get-user-by-email"
        }, {
            email: req.body.email
        })).then(function (result) {
            if (result) {
                let roleValue = "USER";

                for (let role of result.roles) {
                    if (role.value == "ADMIN" || role.value == "SUPERUSER") {
                        roleValue = "ADMIN"
                    }
                }
                document.cookie = `role = ${roleValue}`;
                res.cookie("Role", roleValue, {
                    httpOnly: true,
                    origin: '*',
                    credentials: true
                })
                res.cookie('RefreshToken', result.refreshToken, {
                    httpOnly: true,
                    origin: '*',
                    credentials: true
                })
            } else {
            return false
            }
        })

        return true;
    }
}