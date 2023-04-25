import {Controller, Get, Req, Session, UseGuards} from '@nestjs/common';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {GlobalService} from "@lib/global";
import {AuthService} from "./auth.service";
import {GoogleAuthenticatedGuard, GoogleAuthGuard} from "@lib/global/guards/google.guard";




@Controller("/auth")
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly globalService: GlobalService) {
    }

    @MessagePattern({cmd: "login"})
    async login(@Ctx() context: RmqContext,
                       @Payload() payload) {
        console.log(payload)
        //this.globalService.acknowledgeMessage(context)
        return await this.authService.login(payload)
    }

    @MessagePattern({cmd: "google_login"})
    async google_login(@Ctx() context: RmqContext,
                @Payload() payload) {
        console.log(payload)
        await this.authService.validateUserByGoogleEmail(payload)
        return {msg: "OK"}
    }


    @UseGuards(GoogleAuthGuard)
    @Get("google/login")
    handleLogin() {
        return {msg: "Google auth"}
    }

    @UseGuards(GoogleAuthGuard)
    @Get("google/redirect")
    handleRedirect() {
        return {msg: "OK"}
    }

    @Get()
    async getAuthSession(@Session() session: Record<string, any>) {
        console.log(session)
        console.log(session.id)
        session.authenticated = true
        return session
    }

    @UseGuards(GoogleAuthenticatedGuard)
    @Get('status')
    async getAuthUser(@Req() req: Request) {
        console.log(req)
        return {Hello: "hi"}
    }

}
