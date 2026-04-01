import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {

  constructor(private messageService: MessageService) {}

  handleLogin() {
    // Logic for handling login
    this.messageService.add({
      severity: 'success',
      summary: 'Login Success',
      detail: 'You have successfully logged in!'
    });
  }
}