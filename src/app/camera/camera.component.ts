import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AuthServiceExtensionService} from '../services/authServiceExtension/auth-service-extension.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
})
export class CameraComponent {
  isCmaeraExist: boolean = true;
  showWebcam: boolean = true;
 
  constructor(private authService: AuthService,
    private authExtensionService: AuthServiceExtensionService) {
    
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    // this.authService.register(file,'usernamePuternic', 'andrei.diaconu@bitnovel.com').subscribe({
    //   next: (res) => {
    //     console.log(res)
    //   },
    //   error: (err) => {
    //     console.log('Error Inserting Document :', err);
    //   },
    // });
    
    this.authExtensionService.login(file,'usernamePuternic').subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log('Error :', err);
      },
    });

  }
}
