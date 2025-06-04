// src/events/events.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'; // Import Server và Socket từ 'socket.io'

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:8082', // Thay đổi thành URL của Next.js frontend của bạn
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server; // Biến server này sẽ được sử dụng để phát sự kiện tới tất cả client

  afterInit(server: Server) {
    console.log('Socket.IO Gateway đã khởi tạo');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client kết nối: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client ngắt kết nối: ${client.id}`);
  }

  // Ví dụ về một handler cho tin nhắn đến từ client (nếu có)
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    return `Hello from server: ${payload}`;
  }

  // Phương thức để phát sự kiện khi dữ liệu MySQL thay đổi
  emitMysqlDataChanged(data: any) {
    this.server.emit('mysql_data_changed', data);
    console.log('Đã phát sự kiện mysql_data_changed:', data); 
  }
}
