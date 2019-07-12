import { DatabaseService } from './service/database.service';
import { SocketService } from './service/socket.service';

export class AppComponent {
  constructor() {
    const dbService = new DatabaseService();
    const socketService = new SocketService();

    dbService.connect();
    dbService.fetchUsers();
    socketService.start();
  }
}
