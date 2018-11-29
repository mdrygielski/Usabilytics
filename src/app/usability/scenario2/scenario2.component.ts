import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-scenario2',
  templateUrl: './scenario2.component.html',
  styleUrls: ['./scenario2.component.css']
})
export class Scenario2Component implements OnInit {
  @Output() finished = new EventEmitter<boolean>();
  Math: any;

  firstFormGroupScenario2: FormGroup;
  secondFormGroupScenario2: FormGroup;
  thirdFormGroupScenario2: FormGroup;
  fourthFormGroupScenario2: FormGroup;
  summaryFormGroupScenario2: FormGroup;

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
    this.thirdFormGroupScenario2 = this._formBuilder.group({
      thirdCtrlScenario2: ['', Validators.required]
    });
    this.fourthFormGroupScenario2 = this._formBuilder.group({
      fourthCtrlScenario2: ['', Validators.required]
    });
    this.summaryFormGroupScenario2 = this._formBuilder.group({
      summaryCtrlScenario2: ['', Validators.required]
    });
  }

  introConfirmation() {
    console.log('intro done. Starting first step');
  }

  firstConfirmation() {
    console.log('step 1 - next');
  }

  secondConfirmation() {
    console.log('step 2 - next');
  }

  thirdConfirmation() {
    console.log('step 3 - next');
  }

  fourthConfirmation() {
    console.log('step 4 - next');
  }

  summaryConfirmation() {
    this.finished.emit(true);
    console.log('step 4 - done');
  }

}
