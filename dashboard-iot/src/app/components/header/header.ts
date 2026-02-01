import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';
import { CommonModule } from '@angular/common';
import { RouterModule , Router} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {

  currentTime = '';
  lastUpdate = '—';

  constructor(public themeService: ThemeService) {}

  ngOnInit() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  updateClock() {
    this.currentTime = new Date().toLocaleString();
  }

  setLastUpdate(date: string) {
    this.lastUpdate = date;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
