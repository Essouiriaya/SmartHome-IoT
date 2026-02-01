import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actionneurs } from './actionneurs';

describe('Actionneurs', () => {
  let component: Actionneurs;
  let fixture: ComponentFixture<Actionneurs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Actionneurs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Actionneurs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
