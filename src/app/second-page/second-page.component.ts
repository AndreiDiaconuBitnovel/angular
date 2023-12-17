import { Component, HostListener } from '@angular/core';
import { Languages } from '../Models/languages';
import { TranslationInput } from '../Models/translationInput';
import { TranslationOutput } from '../Models/translationOutput';
import { LanguageService } from '../services/language/language.service';
import { JwtTokenService } from '../services/jwtToken/jwt-token.service';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css'],
})
export class SecondPageComponent {
  constructor(
    private languageService: LanguageService,
    private jwtTokenService: JwtTokenService
  ) {}

  isMobile: boolean = false;
  languageArray: Languages[] = [] as Languages[];
  dropdownFromOptions: string[] = [];
  dropdownToOptions: string[] = [];
  selectedOptionFrom: string = '';
  selectedOptionTo: string = '';
  textAreaFromValue: string = '';
  textAreaToValue: string = '';
  codeFrom: string = '';
  codeTo: string = '';
  translationInput: TranslationInput = {
    from: '',
    to: '',
    inputText: '',
    userId: '',
  };
  translationOutput: TranslationOutput = {
    from: '',
    to: '',
    inputText: '',
    translatedText: '',
  };
  isLoading: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.getAllLanguages();
    this.checkScreenSize();
    this.getUserId();
  }

  getUserId(): void {
    let temp: string = this.jwtTokenService.getUserId();
    temp ? (this.translationInput.userId = temp) : null;
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 767;
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
    });
  }

  populateDropdownFrom(array: string[]) {
    this.dropdownFromOptions = array;
  }

  populateDropdownTo(array: string[]) {
    this.dropdownToOptions = array;
  }

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
  }

  toggleLoading(): void {
    this.isLoading = !this.isLoading;
  }

  getFromToTranslation(input: TranslationInput) {
    this.isLoading = false;
    this.toggleLoading();
    this.languageService.getFromToTranslation(input).
    subscribe({
        next: (result) => {
          this.translationOutput = result;
          console.log(result);
          this.textAreaToValue = result.translatedText;
          this.toggleLoading();
        },
        error: (err) => {
          this.textAreaToValue = 'Language is not supported, try another combination!';
          this.toggleLoading();
        },
      });
    // this.languageService.getFromToTranslation(input).subscribe((result) => {
    //   this.translationOutput = result;
    //   this.textAreaToValue = result.translatedText;
    //   this.toggleLoading();
    // });
  }
}
