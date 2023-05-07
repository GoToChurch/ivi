import {Controller, Get, Req, Session, UseGuards} from '@nestjs/common';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {AuthService} from "./auth.service";
import {GoogleAuthenticatedGuard} from "@app/common";
import {VkAuthGuard} from "@app/common";


@Controller("/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @MessagePattern({cmd: "login"})
    async login(@Ctx() context: RmqContext,
                @Payload() payload) {
        console.log(payload)
        return await this.authService.login(payload)
    }

    @MessagePattern({cmd: "google_login"})
    async google_login(@Ctx() context: RmqContext,
                       @Payload() payload) {
        console.log(payload)
        await this.authService.validateUserByGoogleEmail(payload)
        return {msg: "OK"}
    }

    //@UseGuards(GoogleAuthGuard)
    //@Get("google/redirect")
    //handleRedirect() {
    //    return {msg: "Google auth - success"}
    //}

    @UseGuards(VkAuthGuard)
    @Get("vk/redirect")
    vkRedirect() {
        return {msg: "VK auth - success"}

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
        //console.log(req.json())
        return {Hello: "hi"}
    }
}
