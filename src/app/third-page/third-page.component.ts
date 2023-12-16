import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslationOutput } from '../Models/translationOutput';
import { ItemModalComponent } from '../item-modal/item-modal.component';
// Import Angular Material modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css'],
})
export class ThirdPageComponent {
  items: TranslationOutput[] = [
    {
      from: 'Title 1',
      inputText: 'Text 1',
      to: 'Title 2',
      translatedText: 'Text 2',
    },
    {
      from: 'Another Title 1 cf',
      inputText: `Superhuman Accuracy

        Cockatoo is up to 99% accurate, surpassing human performance with the power of machine learning.
        🏎️
        Blazing Speed
        
        No more slow manual transcription! Cockatoo transcribes 1 hour of audio in just 2-3 minutes. That's 30x faster than doing it yourself and quicker than the competition!
        🗺️
        Transcribe in 90+ Languages
        
        We support transcription in dozens of languages and dialects from around the world.
        😌
        Transcribe Any File
        
        Cockatoo is your file to text converter. Upload audio or video in any format and get a text transcript back in seconds.
        💪
        Unbeatable Pricing
        
        We have pricing plans tailored to fit any budget. AI transcription is finally within reach for everyone.`,
      to: 'Another Title 2 mf',
      translatedText: 'Another Text 2 gf',
    },
    {
      from: 'Title 1',
      inputText: 'Text 1',
      to: 'Title 2',
      translatedText: 'Text 2',
    },
    {
      from: 'Title 1',
      inputText: 'Text 1',
      to: 'Title 2',
      translatedText: 'Text 2',
    },
    {
      from: 'Title 1',
      inputText: 'Text 1',
      to: 'Title 2',
      translatedText: 'Text 2',
    },
    // Add more items as needed
  ];

  searchTerm: string = '';
  filteredItems: TranslationOutput[] = [];
  selectedItem: TranslationOutput | null = null;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.filteredItems = this.items;
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
}
