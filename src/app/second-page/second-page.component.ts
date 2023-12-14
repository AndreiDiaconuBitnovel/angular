import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent {
  constructor(   private router: Router) {
    
  }
  goToFirstPage(){
    this.router.navigate(['/firstPage']);
  }
}
