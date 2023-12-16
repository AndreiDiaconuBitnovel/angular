import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthServiceExtensionService} from './services/authServiceExtension/auth-service-extension.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularProject';

  constructor(  public authServiceExtension: AuthServiceExtensionService, private router: Router) {
    
  }
  goToFirstPage(){
    this.router.navigate(['/firstPage']);
  }
  loggedOut(isLoggedOut:boolean){
    if(isLoggedOut){
      this.authServiceExtension.logOut()
    }
  }


}
