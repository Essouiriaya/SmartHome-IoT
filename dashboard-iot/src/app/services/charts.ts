import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { io } from 'socket.io-client';

export interface SensorData {
  timestamp: string;
  temperature: number;
  humidite: number;
  luminosite: number;
  presence: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  private API_URL = "http://localhost:5000/api";
  private socket = io("http://localhost:5000");

  // Subject for realtime
  private _realtimeData = new Subject<SensorData>();
  realtimeData$ = this._realtimeData.asObservable();

  constructor(private http: HttpClient) {
    // Listen to socket event
    this.socket.on("sensor_update", (data: SensorData) => {
      this._realtimeData.next(data);
    });
  }

  // Get FULL history
  getFullHistory(): Observable<SensorData[]> {
    return this.http.get<SensorData[]>(`${this.API_URL}/history`);
  }
}
