import {AuthGuard} from "@nestjs/passport";
import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";


@Injectable()
export class GoogleAuthGuard extends AuthGuard("google") {
    async canActivate(context: ExecutionContext) {
        const activate = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return activate;
    }
}

@Injectable()
export class GoogleAuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<any> {
        const request = context.switchToHttp().getRequest();
        return request.isAuthenticated()
    }
}

