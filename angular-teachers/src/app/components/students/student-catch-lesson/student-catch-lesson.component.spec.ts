import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCatchLessonComponent } from './student-catch-lesson.component';

describe('StudentCatchLessonComponent', () => {
  let component: StudentCatchLessonComponent;
  let fixture: ComponentFixture<StudentCatchLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCatchLessonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCatchLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
