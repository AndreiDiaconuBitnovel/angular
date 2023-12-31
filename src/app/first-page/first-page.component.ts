import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TestDbDto } from '../Models/testDb';

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
export class FirstPageComponent {
  title: string = 'Welcome to Translation Kingdom';
  bigDescription: string =
    'Discover the amazing features of translation that transcends the realm of international languages! (up to 77 languages)';
  testDbArray: TestDbDto[] = [] as TestDbDto[];
  features: Feature[] = [
    {
      imgSrc: '../assets/logo-translation.png',
      title: 'Normal Translation',
      description:
        'Your everyday translation that you could find on Google Translate, Microsoft Translator, etc. Maybe a bit quicker but not as large as the kingdom!',
    },
    {
      imgSrc: '../assets/ibm_watson_language_translator.png',
      title: 'International Translation',
      description:
        'The kingdom specialty, a translation that transcends normal translators! It may take a bit longer, but any of the 77 languages are at the push of a button.',
    },
    {
      imgSrc: '../assets/logo-history.png',
      title: 'History',
      description:
        'Any translation you make is stored in our database, so it can be accessed at any time. You know, in case your dog ate your homework!',
    },
  ];
  constructor(private router: Router) {}

  onColumnClick(columnNumber: number): void {
    switch (columnNumber) {
      case 0:
        this.router.navigate(['/secondPage']);
        break;
      case 1:
        if(1==1)
        this.router.navigate(['/secondPage']);
        break;
      case 2:
        this.router.navigate(['/thirdPage']);
        break;
    }
  }
}
