import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AlertService } from 'src/app/services/alert.service';
import { StudentService } from 'src/app/services/student.service';
import { TeachereService } from 'src/app/services/teachere.service';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss']
})
export class RegisterStudentComponent {
  tabs: MenuItem[] = [];
  shooseIndex: number = 0;
  form!: FormGroup;
  submitted = false;
  loading = false;
  userId!: number;

  constructor(private formBuilder: FormBuilder,
    private alertService: AlertService,
    public studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,) {
  }

  ngOnInit() {
    this.tabs = [
      { label: "Register User" },
      { label: "Register Student", disabled: false },
    ];

    this.form = this.formBuilder.group({
      learnYear: ['', Validators.required],
    });
  }

  get f() { return this.form.controls; }

  nextStep(userId: number) {
    this.userId = userId;
    this.shooseIndex += 1;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.studentService.registerStudent(this.form.value, this.userId).subscribe(res => {
      this.loading = false;
      this.alertService.success('Registration successful', { keepAfterRouteChange: true });
      this.router.navigate(['../login'], { relativeTo: this.route });

    },
      error => {
        this.alertService.error(error);
        this.loading = false;
      })
  }

}
