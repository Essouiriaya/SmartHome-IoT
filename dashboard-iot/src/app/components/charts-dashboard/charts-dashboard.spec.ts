import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsDashboard } from './charts-dashboard';

describe('ChartsDashboard', () => {
  let component: ChartsDashboard;
  let fixture: ComponentFixture<ChartsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
