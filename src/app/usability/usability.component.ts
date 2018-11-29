import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material';

@Component({
  selector: 'app-usability',
  templateUrl: './usability.component.html',
  styleUrls: ['./usability.component.css']
})
export class UsabilityComponent implements OnInit {
  @ViewChild('mainStepper') stepper: MatStepper;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  scenario1Done() {
    console.log('scenario 1 finished!');
    this.stepper.next();
  }


  scenario2Done() {
    console.log('scenario 1 finished!');
    this.stepper.next();
  }
}
