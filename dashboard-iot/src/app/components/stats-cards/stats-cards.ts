import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],   
  templateUrl: './stats-cards.html',
  styleUrls: ['./stats-cards.scss']
})
export class StatsCardComponent {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() value!: any;
  @Input() unit!: string;
  @Input() color!: string;
  @Input() alert!: boolean;
}
