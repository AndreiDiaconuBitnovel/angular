// login-modal.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent {
  @Input() isModalOpen: boolean = false;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Output() loginEvent = new EventEmitter<{
    username: string;
    password: string;
  }>();
  username: string = '';
  password: string = '';

  closeModal() {
    this.isModalOpen = false;
    this.closeModalEvent.emit(this.isModalOpen);
  }

  login() {
    this.loginEvent.emit({ username: this.username, password: this.password });
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
