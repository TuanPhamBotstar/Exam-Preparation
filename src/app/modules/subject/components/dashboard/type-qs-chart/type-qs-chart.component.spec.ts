import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeQsChartComponent } from './type-qs-chart.component';

describe('TypeQsChartComponent', () => {
  let component: TypeQsChartComponent;
  let fixture: ComponentFixture<TypeQsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeQsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeQsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
