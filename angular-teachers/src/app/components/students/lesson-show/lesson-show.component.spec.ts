import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonShowComponent } from './lesson-show.component';

describe('LessonShowComponent', () => {
  let component: LessonShowComponent;
  let fixture: ComponentFixture<LessonShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
