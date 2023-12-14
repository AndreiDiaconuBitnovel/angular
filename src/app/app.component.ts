import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularProject';

  constructor(   private router: Router) {
    
  }
  goToFirstPage(){
    this.router.navigate(['/firstPage']);
  }



}
