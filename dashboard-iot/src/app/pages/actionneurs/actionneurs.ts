import { Component } from '@angular/core';
import { ActionService } from '../../services/action';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-actionneurs',
  imports:[
    CommonModule
  ],
  templateUrl: './actionneurs.html',
  styleUrls: ['./actionneurs.scss']
})
export class ActionneursComponent {
  ledStatus = false;
  fanStatus = false;
  fanSpeed = 0;
  buzzerStatus = false;
  actionHistory: any[] = [];

  constructor(private actionService: ActionService) {}

  logAction(device: string, commandOrValue: any) {
    this.actionHistory.unshift({
      timestamp: new Date().toLocaleTimeString(),
      device,
      command: typeof commandOrValue === 'number' ? null : commandOrValue,
      value: typeof commandOrValue === 'number' ? commandOrValue : null
    });
  }

  turnOnLED() {
    const action = { device: 'LED', command: 'ON' };
    this.actionService.sendAction(action).subscribe({
      next: () => { this.ledStatus = true; this.logAction('LED', 'ON'); },
      error: (err) => console.error(err)
    });
  }

  turnOffLED() {
    const action = { device: 'LED', command: 'OFF' };
    this.actionService.sendAction(action).subscribe({
      next: () => { this.ledStatus = false; this.logAction('LED', 'OFF'); },
      error: (err) => console.error(err)
    });
  }

  turnOnFan() {
    const action = { device: 'Ventilateur', command: 'ON' };
    this.actionService.sendAction(action).subscribe({
      next: () => { this.fanStatus = true; this.logAction('Ventilateur', 'ON'); },
      error: (err) => console.error(err)
    });
  }

  turnOffFan() {
    const action = { device: 'Ventilateur', command: 'OFF' };
    this.actionService.sendAction(action).subscribe({
      next: () => { this.fanStatus = false; this.logAction('Ventilateur', 'OFF'); },
      error: (err) => console.error(err)
    });
  }

  setFanSpeed(event: any) {
    const speed = event.target.value;
    const action = { device: 'Ventilateur', value: parseInt(speed) };
    this.actionService.sendAction(action).subscribe({
      next: () => { this.fanSpeed = speed; this.logAction('Ventilateur', parseInt(speed)); },
      error: (err) => console.error(err)
    });
  }

  turnOnBuzzer() {
    const action = { device: 'Buzzer', command: 'ON' };
    this.actionService.sendAction(action).subscribe({
      next: () => { this.buzzerStatus = true; this.logAction('Buzzer', 'ON'); },
      error: (err) => console.error(err)
    });
  }

  turnOffBuzzer() {
    const action = { device: 'Buzzer', command: 'OFF' };
    this.actionService.sendAction(action).subscribe({
      next: () => { this.buzzerStatus = false; this.logAction('Buzzer', 'OFF'); },
      error: (err) => console.error(err)
    });
  }
}

