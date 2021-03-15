import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsAnalyticsComponent } from './questions-analytics.component';

describe('QuestionsAnalyticsComponent', () => {
  let component: QuestionsAnalyticsComponent;
  let fixture: ComponentFixture<QuestionsAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
