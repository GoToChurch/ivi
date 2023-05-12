import {Module} from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {PostgresDBModule, Role} from "@app/common";


@Module({
  imports: [
    SequelizeModule.forFeature([Role]),
    PostgresDBModule
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule {}
