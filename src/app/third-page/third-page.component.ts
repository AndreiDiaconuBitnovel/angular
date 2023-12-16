import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslationOutput } from '../Models/translationOutput';
import { ItemModalComponent } from '../item-modal/item-modal.component';
// Import Angular Material modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HistoryInput } from '../Models/historyInput';
import { LanguageService } from '../services/language/language.service';
import { FormsModule } from '@angular/forms';
import { Languages } from '../Models/languages';
import { TranslationOutputFull } from '../Models/translationOutputFull';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css'],
})
export class ThirdPageComponent {
  isLoading: boolean = false;
  historyInput: HistoryInput = {
    userId: 'BFE065FC-039D-484F-A4FD-946FABFFBDD5',
  };
  items: TranslationOutputFull[] = [];

  searchTerm: string = '';
  filteredItems: TranslationOutputFull[] = [];
  selectedItem: TranslationOutput | null = null;
  languageArray: Languages[] = [] as Languages[];

  constructor(
    private dialog: MatDialog,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.filteredItems = this.items;
    this.getAllLanguages();
    // this.getAllHistory(this.historyInput);
  }

  filterItems(): void {
    this.filteredItems = this.items.filter((item) =>
      Object.values(item).some((value) =>
        value.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  openModal(item: TranslationOutput): void {
    this.dialog.open(ItemModalComponent, {
      width: '80%', // Adjust the width based on your preference
      maxWidth: '800px', // Set a maximum width if needed
      height: 'auto', // Automatically adjust the height based on the content
      maxHeight: '80vh', // Set a maximum height if needed
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
      console.log(result);
      this.toggleLoading();
    });
  }
}
