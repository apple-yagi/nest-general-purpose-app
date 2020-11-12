import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(8081, {
  path: '/chat',
  transports: ['websocket'],
  allowUpgrades: false,
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  wss = [];

  async handleConnection(ws) {
    // A client has connected
    this.wss.push(ws);
  }

  async handleDisconnect(ws: WebSocket) {
    // A client has disconnected
    this.wss.filter(w => {
      return ws !== w;
    });
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any): WsResponse<string> {
    return { event: 'message', data: data };
  }

  @SubscribeMessage('broadcast')
  broadcast(socket, data: any): void {
    this.wss.forEach(ws => {
      ws.send(
        JSON.stringify({
          event: 'message',
          data: data,
        }),
      );
    });
  }
}
