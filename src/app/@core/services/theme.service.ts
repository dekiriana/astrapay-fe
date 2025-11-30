import { Injectable, Signal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private dark = signal<boolean>(false);
  isDark = this.dark.asReadonly();

  constructor() {
    const saved = localStorage.getItem('dark');
    if (saved === 'true') {
      this.enableDark();
    }
  }

  toggle() {
    this.dark() ? this.disableDark() : this.enableDark();
  }

  setThemeFile(isDark: boolean) {
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement;
    themeLink.href = isDark
      ? 'node_modules/primeng/resources/themes/lara-dark-blue/theme.css'
      : 'node_modules/primeng/resources/themes/lara-light-blue/theme.css';
  }
  

  private enableDark() {
    document.body.classList.add('dark');
    this.dark.set(true);
    localStorage.setItem('dark', 'true');
    this.setThemeFile(true);
  }

  private disableDark() {
    document.body.classList.remove('dark');
    this.dark.set(false);
    localStorage.setItem('dark', 'false');
    this.setThemeFile(false);
  }
}
