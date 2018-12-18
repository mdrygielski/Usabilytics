import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MatDatepickerInputEvent, MatStepper} from '@angular/material';
import {UserService} from '../../user.service';


@Component({
  selector: 'app-scenario1',
  templateUrl: './scenario1.component.html',
  styleUrls: ['./scenario1.component.css', '../usability.component.css'],
  providers: [],
})

export class Scenario1Component implements OnInit {
  @Output() finished = new EventEmitter<void>();
  @ViewChild('stepper') stepper: MatStepper;
  Math: any;
  stepStartTime: number;


  secondFormGroupScenario1: FormGroup;
  thirdFormGroupScenario1: FormGroup;
  fourthFormGroupScenario1: FormGroup;
  summaryFormGroupScenario1: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public userService: UserService) {
    this.Math = Math;
  }

  ngOnInit() {
    this.secondFormGroupScenario1 = this.formBuilder.group({
      secondCtrlScenario1: ['', Validators.required]
    });
    this.thirdFormGroupScenario1 = this.formBuilder.group({
      thirdCtrlScenario1: ['', Validators.required]
    });
    this.fourthFormGroupScenario1 = this.formBuilder.group({
      fourthCtrlScenario1: ['', Validators.required]
    });
    this.summaryFormGroupScenario1 = this.formBuilder.group({
      summaryCtrlScenario1: ['', Validators.required]
    });
  }


  stepConfirm() {
    this.stepper.next();
    this.stepStartTime = Date.now();
    console.log('statt time set!');
  }

  summaryConfirmation() {
    this.finished.emit();
    console.log('step 4 - done');
  }

}
