import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  private API_URL = "http://localhost:5000/api";
  private socket = io("http://localhost:5000");

  // Dernières mesures (temps réel)
  realtimeData$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.socket.on("new_data", (data) => {
      this.realtimeData$.next(data);
    });
  }

  getStatistics() {
    return this.http.get(`${this.API_URL}/statistics`);
  }

  getAlerts(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/alerts`);
  }

  getLatest(): Observable<any> {
    return this.http.get(`${this.API_URL}/sensors`);
  }

}
