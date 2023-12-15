import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Languages } from '../Models/languages';
import { LanguageService } from '../services/language/language.service';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css'],
})
export class SecondPageComponent {
  constructor(
    private router: Router,
    private languageService: LanguageService
  ) {}

  languageArray: Languages[] = [] as Languages[];
  dropdownFromOptions: string[] = [];
  dropdownToOptions: string[] = [];
  selectedOptionFrom: string = '';
  selectedOptionTo: string = '';
  textAreaFromValue: string = '';
  textAreaToValue: string = '';

  goToFirstPage() {
    this.router.navigate(['/firstPage']);
  }

  ngOnInit(): void {
    this.getAllLanguages();
  }

  getAllLanguages() {
    this.languageService.getAllLanguagesRecord().subscribe((result) => {
      this.languageArray = result;
      let tempArray: string[] = [];
      this.languageArray.forEach((element) => {
        tempArray.push(element.nameInternational);
      });
      this.populateDropdownFrom(tempArray);
      this.populateDropdownTo(tempArray);
      console.log(this.languageArray);
    });
  }

  // Method to populate dropdown 1 options
  populateDropdownFrom(array: string[]) {
    // Replace this with your actual data source or API call
    this.dropdownFromOptions = array;
  }

  // Method to populate dropdown 2 options
  populateDropdownTo(array: string[]) {
    // Replace this with your actual data source or API call
    this.dropdownToOptions = array;
  }

  // Function to extract selected values
  extractSelectedValues(): void {
    console.log('Selected values:');
    console.log('Dropdown 1:', this.selectedOptionFrom);
    console.log('Textarea 1:', this.textAreaFromValue);
    console.log('Dropdown 2:', this.selectedOptionTo);
    console.log('Textarea 2:', this.textAreaToValue);
  }
}
