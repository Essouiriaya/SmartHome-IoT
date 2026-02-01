import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private darkMode = false;

  constructor() {
    const saved = localStorage.getItem('darkMode');
    this.darkMode = saved === 'true';
    this.updateTheme();
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', this.darkMode.toString());
    this.updateTheme();
  }

  private updateTheme() {
    document.body.classList.toggle('dark-mode', this.darkMode);
  }

  isDarkMode() {
    return this.darkMode;
  }
}
