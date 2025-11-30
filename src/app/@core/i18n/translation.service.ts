import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { APP_CONFIG } from '../constants/app.constants';

type Dictionary = Record<string, any>;

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private http = inject(HttpClient);

  readonly activeLang = signal(APP_CONFIG.DEFAULT_LANG);

  private translations$ = new BehaviorSubject<Dictionary>({});

  constructor() {
    this.loadTranslation(this.activeLang());
  }

  loadTranslation(lang: string): void {
    const supported = APP_CONFIG.SUPPORTED_LANGS.includes(lang)
      ? lang
      : APP_CONFIG.DEFAULT_LANG;

    const path = `/assets/i18n/locale-${supported}.json`;

    this.http.get<Dictionary>(path).pipe(
      catchError((error) => {
        console.error(`ERROR: Gagal memuat file terjemahan dari ${path}`, error);
        return of({});
      })
    ).subscribe(data => {
      this.translations$.next(data);
      this.activeLang.set(supported);
      console.log(`INFO: Bahasa aplikasi diatur ke: ${supported}`);
    });
  }

  private resolve(key: string, obj: any): any {
    return key.split('.').reduce((o, i) => o?.[i], obj);
  }

  translate(key: string): string {
    const dict = this.translations$.getValue();
    return this.resolve(key, dict) || key;
  }

  setLanguage(lang: string): void {
    this.loadTranslation(lang);
  }
}
