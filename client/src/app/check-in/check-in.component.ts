import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CheckInService } from '../services/check-in.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent implements OnInit {
  error: any;
  bookingCode = '';
  lastName = '';
  checkInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private checkInService: CheckInService,
    private router: Router
  ) {
    this.checkInForm = this.formBuilder.group({
      bookingCode: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')],
      ],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    });
  }

  ngOnInit(): void {}

  validateCheckIn() {
    this.checkInService
      .getCheckInDetails(
        this.checkInForm.value.bookingCode,
        this.checkInForm.value.lastName
      )
      .subscribe({
        next: (res: any) => {
          let response = res.data.checkIn;
          this.bookingCode = this.checkInForm.value.bookingCode;
          if (this.bookingCode === response.bookingCode) {
            this.router.navigate(['/success']);
          }
        },
        error: (errors) => {
          this.error = errors.message;
        },
      });
  }
}
