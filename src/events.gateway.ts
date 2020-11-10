import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any): WsResponse<string> {
    return { event: 'message', data: data };
  }

  @SubscribeMessage('broadcast')
  broadcast(@MessageBody() data: any): void {
    this.server.emit('broadcast', { event: 'response', data: data });
  }
}
