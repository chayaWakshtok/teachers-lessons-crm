import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSendMessageComponent } from './student-send-message.component';

describe('StudentSendMessageComponent', () => {
  let component: StudentSendMessageComponent;
  let fixture: ComponentFixture<StudentSendMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentSendMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSendMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
