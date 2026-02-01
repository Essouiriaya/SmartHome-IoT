// src/app/app.ts
import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [LayoutComponent]
})
export class App {}
