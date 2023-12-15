import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Languages } from '../Models/languages';
import { TranslationInput } from '../Models/translationInput';
import { TranslationOutput } from '../Models/translationOutput';
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
  codeFrom: string = '';
  codeTo: string = '';
  translationInput: TranslationInput = { from: '', to: '', inputText: '' };
  translationOutput: TranslationOutput = {
    from: '',
    to: '',
    inputText: '',
    translatedText: '',
  };
  isLoading: boolean = false;

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
    if (this.selectedOptionFrom) {
      this.codeFrom = this.languageArray.filter(
        (e) => e.nameInternational == this.selectedOptionFrom
      )[0].code;
    }
    if (this.selectedOptionTo) {
      this.codeTo = this.languageArray.filter(
        (e) => e.nameInternational == this.selectedOptionTo
      )[0].code;
    }
    this.translationInput.from = this.codeFrom;
    this.translationInput.to = this.codeTo;
    this.translationInput.inputText = this.textAreaFromValue;

    this.getFromToTranslation(this.translationInput);

    console.log(
      'Selected values:' +
        this.translationInput.from +
        ' : ' +
        this.translationInput.to
    );
  }

  toggleLoading(): void {
    this.isLoading = !this.isLoading;
  }

  getFromToTranslation(input: TranslationInput) {
    this.isLoading = false;
    this.toggleLoading();
    this.languageService.getFromToTranslation(input).subscribe((result) => {
      this.translationOutput = result;
      console.log(result);
      this.textAreaToValue = result.translatedText;
      this.toggleLoading();
    });
  }
}
