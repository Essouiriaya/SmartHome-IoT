import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alerts-stats',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './alerts-stats.html',
  styleUrls: ['./alerts-stats.scss']
})
export class AlertsStatsComponent {
  @Input() alerts: string[] = [];
  @Input() totalMeasurements: number = 0;
  @Input() averageTemperature: number = 0;
  @Input() averageHumidity: number = 0;
  @Input() lastUpdate: Date | null = null;
}
