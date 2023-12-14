import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestDbDto } from '../Models/testDb';
import { TestDbService } from '../services/test-db.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css'],
})
export class FirstPageComponent implements OnInit {
  testDbArray: TestDbDto[] = [] as TestDbDto[];
  constructor(private router: Router,
    private testDbService: TestDbService,
    ) {}
  ngOnInit(): void {
    this.getAllTestDbData()
  }
  goToSecondPage() {
    this.router.navigate(['/secondPage']);
  }

  getAllTestDbData(){
    this.testDbService.getAllTestDbRecord().subscribe((result) => {
      this.testDbArray = result;
      console.log(this.testDbArray )
    });
  }
}
