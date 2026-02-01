// src/app/components/charts-dashboard/charts-dashboard.ts
import { Component, OnInit } from '@angular/core';
import { ChartsService, SensorData } from '../../services/charts';
import { ChartData, ChartOptions } from 'chart.js';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-charts-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './charts-dashboard.html',
  styleUrls: ['./charts-dashboard.scss']
})
export class ChartsDashboardComponent implements OnInit {

  tempChartData: ChartData<'line'> = { labels: [], datasets: [{ data: [], label: 'Temperature (°C)', borderColor: '#ff595e', fill: false }]};
  humChartData: ChartData<'line'> = { labels: [], datasets: [{ data: [], label: 'Humidity (%)', borderColor: '#ff595e', fill: false }]};
  luxChartData: ChartData<'line'> = { labels: [], datasets: [{ data: [], label: 'Luminosity (LUX)', borderColor: '#ff595e', fill: false }]};
  presenceChartData: ChartData<'bar'> = { labels: [], datasets: [{ data: [], label: 'Presence detections', backgroundColor: '#1982c4' }]};

  tempChartOptions: ChartOptions<'line'> = { responsive: true };
  humChartOptions: ChartOptions<'line'> = { responsive: true };
  luxChartOptions: ChartOptions<'line'> = { responsive: true };
  presenceChartOptions: ChartOptions<'bar'> = { responsive: true };

  constructor(private chartsService: ChartsService) {}

  ngOnInit() {
    this.loadHistory();
    // Temps réel
    this.chartsService.realtimeData$.subscribe(res => {
      if (!res) return;
      this.updateCharts(res);
    });
  }

  loadHistory() {
    this.chartsService.getFullHistory().subscribe((history: SensorData[]) => {
      history.forEach(m => this.updateCharts(m, false));
    });
  }

  updateCharts(data: SensorData, shiftIfFull: boolean = true) {
    const timeLabel = new Date(data.timestamp).toLocaleTimeString();

    // Temperature
    this.tempChartData.labels?.push(timeLabel);
    this.tempChartData.datasets[0].data.push(data.temperature);
    if (shiftIfFull && this.tempChartData.labels!.length > 24) {
      this.tempChartData.labels!.shift();
      this.tempChartData.datasets[0].data.shift();
    }

    // Humidity
    this.humChartData.labels?.push(timeLabel);
    this.humChartData.datasets[0].data.push(data.humidite);
    if (shiftIfFull && this.humChartData.labels!.length > 24) {
      this.humChartData.labels!.shift();
      this.humChartData.datasets[0].data.shift();
    }

    // Luminosity
    this.luxChartData.labels?.push(timeLabel);
    this.luxChartData.datasets[0].data.push(data.luminosite);
    if (shiftIfFull && this.luxChartData.labels!.length > 24) {
      this.luxChartData.labels!.shift();
      this.luxChartData.datasets[0].data.shift();
    }

    // Presence
    this.presenceChartData.labels?.push(timeLabel);
    this.presenceChartData.datasets[0].data.push(data.presence ? 1 : 0);
    if (shiftIfFull && this.presenceChartData.labels!.length > 24) {
      this.presenceChartData.labels!.shift();
      this.presenceChartData.datasets[0].data.shift();
    }
  }
}
