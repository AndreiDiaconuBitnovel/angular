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
  items: TranslationOutput[] = [];

  searchTerm: string = '';
  filteredItems: TranslationOutput[] = [];
  selectedItem: TranslationOutput | null = null;

  constructor(
    private dialog: MatDialog,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.filteredItems = this.items;
    this.getFromToTranslation(this.historyInput);
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

  getFromToTranslation(input: HistoryInput) {
    this.isLoading = false;
    this.toggleLoading();
    this.languageService.getAllHistoryRecord(input).subscribe((result) => {
      this.items = result;
      this.filterItems();
      console.log(result);
      this.toggleLoading();
    });
  }
}
