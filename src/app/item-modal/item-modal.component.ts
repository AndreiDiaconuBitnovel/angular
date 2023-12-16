// item-modal.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Item {
  from: string;
  inputText: string;
  to: string;
  translatedText: string;
  fromLanguage: string;
  toLanguage: string;
}

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html', // Include the HTML file
  styleUrls: ['./item-modal.component.css'],
})
export class ItemModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Item) {}

  copyToClipboard(text: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}
