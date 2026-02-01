import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Mesure {
  temperature: number;
  humidite: number;
  luminosite: number;
  presence: boolean;
  timestamp: string;
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe], 
  templateUrl: './history.html',
  styleUrls: ['./history.scss'], 
})

export class HistoryComponent implements OnInit {
  history: Mesure[] = [];
  filtered: Mesure[] = [];
  search = '';
  selectedDate: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory() {
    this.http.get<Mesure[]>('http://localhost:5000/api/history/db').subscribe(res => {
      this.history = res.reverse();  
      this.filtered = [...this.history];
    });
  }

  filter() {
    this.filtered = this.history.filter(item =>
      item.timestamp.includes(this.search) ||
      item.temperature.toString().includes(this.search) ||
      item.humidite.toString().includes(this.search)
    );

    if (this.selectedDate) {
      this.filtered = this.filtered.filter(item =>
        item.timestamp.startsWith(this.selectedDate)
      );
    }
  }
  clearHistory() {
    if (confirm('Are you sure you want to clear all history?')) {
      this.http.delete('http://localhost:5000/api/history/clear').subscribe({
        next: (res: any) => {
          console.log('History cleared:', res);
          this.history = [];
          this.filtered = [];
        },
        error: (err) => console.error('Error clearing history:', err)
      });
    }
  }
}
