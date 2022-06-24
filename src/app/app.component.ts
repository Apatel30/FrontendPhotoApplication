import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PhotoApplication';
  
  

  constructor(public UserService: UserService, public messageservice: MessageService) {
  }
  


  signOut() {
    this.UserService.SignOut();
  }

  clearMessages(){
    this.messageservice.clearMessages();
  }


}

