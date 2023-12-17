import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslationOutput } from '../Models/translationOutput';
import { ItemModalComponent } from '../item-modal/item-modal.component';
import { HistoryInput } from '../Models/historyInput';
import { LanguageService } from '../services/language/language.service';
import { Languages } from '../Models/languages';
import { TranslationOutputFull } from '../Models/translationOutputFull';
import { JwtTokenService } from '../services/jwtToken/jwt-token.service';
import { AuthServiceExtensionService } from '../services/authServiceExtension/auth-service-extension.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css'],
})
export class ThirdPageComponent implements OnInit {
  isLoading: boolean = false;
  historyInput: HistoryInput = {
    userId: '',
  };
  items: TranslationOutputFull[] = [];

  searchTerm: string = '';
  filteredItems: TranslationOutputFull[] = [];
  selectedItem: TranslationOutput | null = null;
  languageArray: Languages[] = [] as Languages[];
  isLogedIn: boolean = false;
  constructor(
    private router: Router,
    public authServiceExtension: AuthServiceExtensionService,
    private dialog: MatDialog,
    private languageService: LanguageService,
    private jwtTokenService: JwtTokenService
  ) {}

  ngOnInit(): void {
    this.authServiceExtension.isLoggedIn.subscribe((x) => (this.isLogedIn = x));
    if (!this.isLogedIn) {
      this.router.navigate(['/firstPage']);
    }
    if (this.isLogedIn) {
      this.filteredItems = this.items;
      this.getAllLanguages();
      this.getUserId();
    }
  }

  getUserId(): void {
    let temp: string = this.jwtTokenService.getUserId();
    temp ? (this.historyInput.userId = temp) : null;
  }

  filterItems(): void {
    this.filteredItems = this.items.filter((item) =>
      Object.values(item).some((value) =>
        value.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  openModal(item: TranslationOutputFull): void {
    this.dialog.open(ItemModalComponent, {
      width: '80%',
      maxWidth: '800px',
      height: 'auto',
      maxHeight: '80vh',
      data: item,
    });
  }

  toggleLoading(): void {
    this.isLoading = !this.isLoading;
  }

  getAllLanguages() {
    this.languageService.getAllLanguagesRecord().subscribe((result) => {
      this.languageArray = result;

      this.getAllHistory(this.historyInput);
    });
  }

  getAllHistory(input: HistoryInput) {
    this.isLoading = false;
    this.toggleLoading();
    this.languageService.getAllHistoryRecord(input).subscribe((result) => {
      this.items = result.map((x) => {
        let obj = {} as TranslationOutputFull;
        obj.from = x.from;
        obj.to = x.to;
        obj.inputText = x.inputText;
        obj.translatedText = x.translatedText;
        obj.fromLanguage = String(
          this.languageArray.find((x) => x.code == obj.from)?.nameInternational
        );
        obj.toLanguage = String(
          this.languageArray.find((x) => x.code == obj.to)?.nameInternational
        );
        return obj;
      });

      this.filterItems();
      this.toggleLoading();
    });
  }
}
