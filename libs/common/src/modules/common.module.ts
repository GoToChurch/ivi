import {ConfigModule, ConfigService} from "@nestjs/config";
import {DynamicModule, Module} from "@nestjs/common";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {CommonService} from "@app/common/services/common.service";


interface CommonModuleOptions {
  name: string;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "./.env",
    }),
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {
  static registerRmq({ name }: CommonModuleOptions): DynamicModule {
    return {
      module: CommonModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>("RABBITMQ_URI")],
                queue: configService.get<string>(`RABBITMQ_${name}_QUEUE`),
                noAck: false,
                persistent: true,
                queueOptions: {
                  durable: true,
                },
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
