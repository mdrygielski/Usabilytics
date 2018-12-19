import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material';

@Component({
  selector: 'app-scenario3',
  templateUrl: './scenario3.component.html',
  styleUrls: ['./scenario3.component.css', '../usability.component.css']
})
export class Scenario3Component implements OnInit {
  @Output() finished = new EventEmitter<void>();
  @ViewChild('stepper') stepper: MatStepper;
  Math: any;
  stepStartTime: number;

  summaryFormGroupScenario3: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.Math = Math;
  }

  ngOnInit() {
    this.summaryFormGroupScenario3 = this._formBuilder.group({
      summaryCtrlScenario3: ['', Validators.required]
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
