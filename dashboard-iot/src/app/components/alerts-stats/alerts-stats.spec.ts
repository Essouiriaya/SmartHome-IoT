import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsStats } from './alerts-stats';

describe('AlertsStats', () => {
  let component: AlertsStats;
  let fixture: ComponentFixture<AlertsStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertsStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertsStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
