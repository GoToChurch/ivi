import {DynamicModule, Module} from '@nestjs/common';
import { GlobalService} from '../services/global.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {ClientsModule, Transport} from "@nestjs/microservices";

interface GlobalModuleOptions {
  name: string;
}


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
  ],
  providers: [GlobalService],//[GlobalService, ConfigService],
  exports: [GlobalService],
})
export class GlobalModule {
  static registerRmq({ name }: GlobalModuleOptions): DynamicModule {
    return {
      module: GlobalModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RABBIT_MQ_URI')],
                queue: configService.get<string>(`RABBIT_MQ_${name}_QUEUE`),
                //replyQueue: configService.get<string>(`RABBIT_MQ_${name}_REPLY_QUEUE`),
                queueOptions: {
                  durable: true, // queue survives broker restart
                },
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      //providers: [ConfigService],
      exports: [ClientsModule]//[ClientsModule, ConfigService],
    };
  }
}



