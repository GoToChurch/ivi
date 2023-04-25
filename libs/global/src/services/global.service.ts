import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {RmqContext, RmqOptions, Transport} from "@nestjs/microservices";

@Injectable()
export class GlobalService {
    constructor(private readonly configService: ConfigService) {}

    getRmqOptions(queue: string, noAck = false): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.get<string>('RABBIT_MQ_URI')],
                queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
                //replyQueue: this.configService.get<string>(`RABBIT_MQ_${queue}_REPLY_QUEUE`),
                noAck,
                persistent: true,
                queueOptions: {
                    durable: true,
                },
            },
        };
    }

    acknowledgeMessage(context: RmqContext) {
        const channel = context.getChannelRef();
        const message = context.getMessage();
        channel.ack(message);
    }
}
