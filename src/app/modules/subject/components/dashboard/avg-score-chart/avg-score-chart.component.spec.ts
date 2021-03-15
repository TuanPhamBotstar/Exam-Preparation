import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgScoreChartComponent } from './avg-score-chart.component';

describe('AvgScoreChartComponent', () => {
  let component: AvgScoreChartComponent;
  let fixture: ComponentFixture<AvgScoreChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvgScoreChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvgScoreChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
