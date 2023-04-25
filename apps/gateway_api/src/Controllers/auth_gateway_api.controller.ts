import {Body, Controller, Inject, Post} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {UserLoginDto} from "../../../auth_reg/src/auth/AUTH_DTO/userLoginDto";





@Controller("/auth")
export class AuthGatewayApiController {
  constructor(@Inject("AUTH") private readonly usersClient: ClientProxy
              ) {}

  @Post("/login")
  async login(@Body() dto: UserLoginDto) {
    return this.usersClient.send({cmd: "login"}, dto);
  };

  //@UseGuards(GoogleAuthGuard)
  //@Get("google/login")
  //handleLogin() {
  //  return {msg: "Google auth"}
  //}

  //@UseGuards(GoogleAuthGuard)
  //@Get("google/redirect")
  //handleRedirect() {
  //  return {msg: "OK"}
  //}
}
