import { Component, OnInit } from '@angular/core';
import { SensorsService } from '../../services/sensors';
import { StatsCardComponent } from '../../components/stats-cards/stats-cards';
import { AlertsStatsComponent } from '../../components/alerts-stats/alerts-stats';
import { ChartsDashboardComponent } from '../../components/charts-dashboard/charts-dashboard'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StatsCardComponent,
    AlertsStatsComponent,
    ChartsDashboardComponent
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit {

  data: any;
  alerts: string[] = [];
  totalMeasurements = 0;
  averageTemperature = 0;
  averageHumidity = 0;
  lastUpdate: Date | null = null;

  constructor(private sensors: SensorsService) {}

  ngOnInit() {
    // Initial data
    this.sensors.getLatest().subscribe(res => this.data = res);

    // Load global statistics
    this.sensors.getStatistics().subscribe((res: any) => {
      console.log('Statistics received:', res);
      this.totalMeasurements = res.total_mesures;
      this.averageTemperature = Number(res.moyenne_temperature);
      this.averageHumidity = Number(res.moyenne_humidite);
      this.lastUpdate = res.derniere_mesure
        ? new Date(res.derniere_mesure.timestamp)
        : null;
    });

    // Load critical alerts
    this.sensors.getAlerts().subscribe(res => this.alerts = res);

    // Real-time updates via WebSocket
    this.sensors.realtimeData$.subscribe(res => {
      if (!res) return;

      // Update live statistics
      this.totalMeasurements += 1;
      this.averageTemperature = (this.averageTemperature * (this.totalMeasurements - 1) + res.temperature) / this.totalMeasurements;
      this.averageHumidity = (this.averageHumidity * (this.totalMeasurements - 1) + res.humidite) / this.totalMeasurements;
      this.lastUpdate = new Date(res.timestamp);

      // Check alerts
      this.alerts = [];
      if (res.temperature > 35) this.alerts.push('High temperature!');
      if (res.humidite < 20) this.alerts.push('Low humidity!');
      if (res.luminosite < 100) this.alerts.push('Low brightness detected.');
      if (res.presence) this.alerts.push('Movement detected in the living room.');
    });
  }
}
