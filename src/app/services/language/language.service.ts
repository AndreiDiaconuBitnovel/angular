import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HistoryInput } from 'src/app/Models/historyInput';
import { Languages } from 'src/app/Models/languages';
import { TranslationInput } from 'src/app/Models/translationInput';
import { TranslationOutput } from 'src/app/Models/translationOutput';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private getAllLanguagesUrl =
    'TranslateLanguage/getAllTranslateLanguageRecord';
  private fromToTranslationUrl = 'TranslateWatson/translate';
  private getAllHistoryUrl = 'TranslateWatson/translateHistory';
  constructor(private http: HttpClient) {}

  getAllLanguagesRecord() {
    return this.http.get<Languages[]>(
      `${environment.apiUrl}/${this.getAllLanguagesUrl}`
    );
  }

  getFromToTranslation(request: TranslationInput) {
    return this.http.post<TranslationOutput>(
      `${environment.apiUrl}/${this.fromToTranslationUrl}`,
      request
    );
  }

  getAllHistoryRecord(request: HistoryInput) {
    return this.http.post<TranslationOutput[]>(
      `${environment.apiUrl}/${this.getAllHistoryUrl}`,
      request
    );
  }
}
