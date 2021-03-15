import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectOveriewComponent } from './subject-overiew.component';

describe('SubjectOveriewComponent', () => {
  let component: SubjectOveriewComponent;
  let fixture: ComponentFixture<SubjectOveriewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectOveriewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectOveriewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
