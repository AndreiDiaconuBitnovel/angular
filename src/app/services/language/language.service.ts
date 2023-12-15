import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Languages } from 'src/app/Models/languages';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private getAllLanguagesUrl =
    'TranslateLanguage/getAllTranslateLanguageRecord';

  constructor(private http: HttpClient) {}

  getAllLanguagesRecord() {
    return this.http.get<Languages[]>(
      `${environment.apiUrl}/${this.getAllLanguagesUrl}`
    );
  }
}
