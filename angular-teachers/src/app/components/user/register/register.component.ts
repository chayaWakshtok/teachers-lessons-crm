import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { City } from 'src/app/models/city';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  submitted = false;
  cities!: City[];
  @Output() nextStep: EventEmitter<number> = new EventEmitter();
  @Input() roleId: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private cityService: CityService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required, Validators.minLength(2)],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      tz: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: [1, Validators.required],
      bornDate: ['', [Validators.required]],
      phone: ['', Validators.required],
      telphone: [''],
      cityId: ['', Validators.required],
      street: [''],
      roleId: [this.roleId, Validators.required],
    });
    this.cityService.getCities().subscribe(res => {
      this.cities = res;
    })

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.accountService.register(this.form.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          //this.alertService.success('Registration successful', { keepAfterRouteChange: true });
          //this.router.navigate(['../login'], { relativeTo: this.route });
          this.nextStep.next(data.data);
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}

export class DateValidator {

  static LessThanToday(control: FormControl): ValidationErrors | null {
    let today: Date = new Date();

    if (new Date(control.value) > today)
      return { "LessThanToday": true };

    return null;
  }
}
