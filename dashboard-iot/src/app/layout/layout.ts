import { Component, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../components/header/header';
import { SidebarComponent } from '../components/sidebar/sidebar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    HeaderComponent, 
    SidebarComponent
  ],
  template: `
    <app-header></app-header>
    <div class="layout">
      <app-sidebar></app-sidebar>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class LayoutComponent {
  isSidebarExpanded = false;

  @HostListener('document:mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    // Vérifier si la souris est sur la sidebar
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && sidebar.contains(event.target as Node)) {
      this.isSidebarExpanded = true;
      document.body.classList.add('sidebar-expanded');
      document.body.classList.remove('sidebar-collapsed');
    } else {
      this.isSidebarExpanded = false;
      document.body.classList.add('sidebar-collapsed');
      document.body.classList.remove('sidebar-expanded');
    }
  }
}