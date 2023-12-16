import { Component } from '@angular/core';
import { TranslationOutput } from '../Models/translationOutput';

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

  constructor() {}

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
}
