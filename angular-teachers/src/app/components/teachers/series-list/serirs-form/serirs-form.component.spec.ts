import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerirsFormComponent } from './serirs-form.component';

describe('SerirsFormComponent', () => {
  let component: SerirsFormComponent;
  let fixture: ComponentFixture<SerirsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerirsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SerirsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
