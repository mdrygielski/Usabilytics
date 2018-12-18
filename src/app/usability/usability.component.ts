import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {UserService} from '../user.service';

@Component({
  selector: 'app-usability',
  templateUrl: './usability.component.html',
  styleUrls: ['./usability.component.css']
})
export class UsabilityComponent implements OnInit {
  @ViewChild('mainStepper') stepper: MatStepper;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              public userService: UserService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  scenario1Done() {
    console.log('scenario 1 finished!');
    this.stepper.next();
  }

  scenario2Done() {
    console.log('scenario 2 finished!');
    this.stepper.next();
  }

  scenario3Done() {
    console.log('scenario 3 finished!');
    this.stepper.next();
  }
}
