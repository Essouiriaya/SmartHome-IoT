// action.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ActionService {
  private apiUrl = 'http://localhost:5000/api/action';

  constructor(private http: HttpClient) {}

  sendAction(action: any) {
    return this.http.post(this.apiUrl, action);
  }
}
