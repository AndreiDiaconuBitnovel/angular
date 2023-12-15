import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestDbDto } from '../Models/testDb';
import { TestDbService } from '../services/test-db.service';

interface Feature {
  imgSrc: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css'],
})
export class FirstPageComponent implements OnInit {
  testDbArray: TestDbDto[] = [] as TestDbDto[];
  features: Feature[] = [
    {
      imgSrc: '../assets/image1.png',
      title: 'Feature 1',
      description: 'Description of feature 1.',
    },
    {
      imgSrc: '../assets/image2.jpg',
      title: 'Feature 2',
      description: 'Description of feature 2.',
    },
    {
      imgSrc: '../assets/image3.png',
      title: 'Feature 3',
      description: 'Description of feature 3.',
    },
  ];
  constructor(private router: Router, private testDbService: TestDbService) {}

  ngOnInit(): void {
    this.getAllTestDbData();
  }

  onColumnClick(columnNumber: number): void {
    console.log(`Column ${columnNumber} clicked`);
    // Add your logic here for the click event
  }

  goToSecondPage() {
    this.router.navigate(['/secondPage']);
  }

  getAllTestDbData() {
    this.testDbService.getAllTestDbRecord().subscribe((result) => {
      this.testDbArray = result;
      console.log(this.testDbArray);
    });
  }
}
