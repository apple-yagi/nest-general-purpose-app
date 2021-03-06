import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number): any {
    console.log('redis port is ' + port);
    const server = super.createIOServer(port);
    const redisAdapter = redisIoAdapter({
      host: 'localhost',
      port: 6379,
    });
    server.adapter(redisAdapter);
    return server;
  }
}
