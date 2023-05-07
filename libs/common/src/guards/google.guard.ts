import {AuthGuard} from "@nestjs/passport";
import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";


@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
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

//@Injectable()
//export class GoogleCurrentUserOrAdminGuard implements CanActivate {
//    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//        const request = context.switchToHttp().getRequest();
//        try {
//            const roles = request.user.roles.map(role => role.value);
//            const admin = roles.filter(role => role === "ADMIN" || role === "SUPERUSER");
//            if (request.user.id === +request.params['id'] || request.user.email === request.params['email'] ||
//                request.user.phone === request.params['phone'] || admin.length > 0) {
//                return true;
//            }
//        } catch (err) {
//            throw new UnauthorizedException({message: 'Вы не можете удалить этого пользователя'})
//        }
//
//    }
//}