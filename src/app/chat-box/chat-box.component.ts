import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client' 
const SOCKET_ENDPOINT = 'localhost:3000'
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
socket : any
message : any
  constructor() { }

  ngOnInit(): void {
    this.setupSocketConnection();

  }

  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);

    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
       const element = document.createElement('li');
       element.innerHTML = data;
       element.style.background = 'white';
       element.style.padding =  '15px 30px';
       element.style.margin = '10px';
       var messagelist = document.getElementById("message-list") as HTMLElement 
       if (messagelist != null){
     messagelist.appendChild(element) 
       }
              }
              else{
                console.log("data err");
                
              }
     });
 }

 SendMessage() {
  this.socket.emit('message', this.message);
  // this.message = '';

  const element = document.createElement('p');
  element.innerHTML = this.message;
  element.style.background = 'blue';
  element.style.padding =  '15px 30px';
  element.style.margin = '10px';
  element.style.textAlign = 'right';
  element.style.textDecorationColor="white"
  var messagelist = document.getElementById("message-list") as HTMLElement 
  if (messagelist != null){
messagelist.appendChild(element) 
  }
  
  this.message = '';
}

}
