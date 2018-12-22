import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {UserService} from '../../user.service';

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

  summaryFormGroupScenario2: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              public userService: UserService) {
    this.Math = Math;
  }

  ngOnInit() {
    this.summaryFormGroupScenario2 = this._formBuilder.group({
      summaryCtrlScenario2: ['', Validators.required]
    });
  }

  stepConfirm() {
    this.stepper.next();
    this.stepStartTime = Date.now();
  }

  summaryConfirmation() {
    this.finished.emit();
    console.log('step 4 - done');
  }

}
