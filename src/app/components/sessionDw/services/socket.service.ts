import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private hubConnection: HubConnection | undefined;
  public messageReceived = new Subject<{ user: string, message: string, idChange: string }>();

  startConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44368/socketMessage') 
      .build();
 
    this.hubConnection
      .start()
      .then(() => console.log('Conexión establecida'))
      .catch(err => console.log('Error al conectar:', err));

    this.hubConnection.on('Resive Mensaje', (user: string, message: string, idChange: string) => {
      this.messageReceived.next({ user, message , idChange});
    });
  }

  stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop().then(() => console.log('Conexión cerrada'));
    }
  }
}
