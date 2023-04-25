import {forwardRef, Module} from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {AuthModule} from "../../../auth_reg/src/auth/auth.module";
import {Role} from "./role.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Role]),
    forwardRef( () =>AuthModule)
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule {}
