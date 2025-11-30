import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TranslationService } from './@core/i18n/translation.service';
import { TranslatePipe } from "./@shared/pipes/translate.pipes";
import { NoteList } from './@features/notes/components/note-list/note-list';
import { ThemeService } from './@core/services/theme.service';
import { CommonModule } from '@angular/common';
import { NoteShell } from './@features/notes/components/note-shell/note-shell';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, TranslatePipe,NoteShell, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Astrapay Exam');

  private translationService = inject(TranslationService);

  lang = this.translationService.activeLang;

  constructor(private theme: ThemeService) {}

  get isDarkMode() {
    return this.theme.isDark();
  }

  toggleTheme() {
    this.theme.toggle();
  }


  changeLang(lang: string) {
    this.translationService.setLanguage(lang);
  }
}
