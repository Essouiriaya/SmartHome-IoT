// services/api.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

export interface SensorData {
  temperature: number | null;
  humidite: number | null;
  luminosite: number | null;
  presence: boolean | null;
  timestamp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';
  private socket: Socket;

  constructor(private http: HttpClient) {
    // Initialisation du WebSocket
    this.socket = io('http://localhost:5000');
  }

  getCurrentSensors(): Observable<SensorData> {
    return this.http.get<SensorData>(`${this.baseUrl}/sensors`);
  }

  getHistory(): Observable<SensorData[]> {
    return this.http.get<SensorData[]>(`${this.baseUrl}/history`);
  }

  getHistoryByDate(date: string): Observable<SensorData[]> {
    return this.http.get<SensorData[]>(`${this.baseUrl}/history/${date}`);
  }

  getStatistics(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/statistics`);
  }

  getAlerts(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/alerts`);
  }

  sendAction(action: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/action`, action);
  }

  onNewData(callback: (data: SensorData) => void) {
    this.socket.on('new_data', (data: SensorData) => {
      callback(data);
    });
  }

  onInitData(callback: (data: SensorData[]) => void) {
    this.socket.on('init_data', (data: SensorData[]) => {
      callback(data);
    });
  }

  disconnectSocket() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
