import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material';

@Component({
  selector: 'app-scenario2',
  templateUrl: './scenario2.component.html',
  styleUrls: ['./scenario2.component.css', '../usability.component.css']
})
export class Scenario2Component implements OnInit {
  @Output() finished = new EventEmitter<void>();
  @ViewChild('stepper') stepper: MatStepper;
  Math: any;
  stepStartTime: number;

  firstFormGroupScenario2: FormGroup;
  secondFormGroupScenario2: FormGroup;
  summaryFormGroupScenario2: FormGroup;
  slider1 = 0;

  constructor(private _formBuilder: FormBuilder) {
    this.Math = Math;
  }

  ngOnInit() {
    this.firstFormGroupScenario2 = this._formBuilder.group({
      firstCtrlScenario2: ['', Validators.required]
    });
    this.secondFormGroupScenario2 = this._formBuilder.group({
      secondCtrlScenario2: ['', Validators.required]
    });
    this.summaryFormGroupScenario2 = this._formBuilder.group({
      summaryCtrlScenario2: ['', Validators.required]
    });
  }

  stepConfirm() {
    this.stepper.next();
    this.stepStartTime = Date.now();
    console.log('statt time set!');
  }

  firstConfirmation() {
    console.log('step 1 - next');
  }

  secondConfirmation() {
    console.log('step 2 - next');
  }

  thirdConfirmation() {
    console.log(this.slider1 + ' step 3 - next');
  }

  fourthConfirmation() {
    console.log('step 4 - next');
  }

  summaryConfirmation() {
    this.finished.emit();
    console.log('step 4 - done');
  }

}
