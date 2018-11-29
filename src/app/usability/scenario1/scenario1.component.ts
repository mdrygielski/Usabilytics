import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-scenario1',
  templateUrl: './scenario1.component.html',
  styleUrls: ['./scenario1.component.css', '../usability.component.css'],
  providers: [],
})

export class Scenario1Component implements OnInit {
  @Output() finished = new EventEmitter<boolean>();
  Math: any;

  firstFormGroupScenario1: FormGroup;
  secondFormGroupScenario1: FormGroup;
  thirdFormGroupScenario1: FormGroup;
  fourthFormGroupScenario1: FormGroup;
  summaryFormGroupScenario1: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.Math = Math;
  }

  ngOnInit() {
    this.firstFormGroupScenario1 = this._formBuilder.group({
      firstCtrlScenario1: ['', Validators.required]
    });
    this.secondFormGroupScenario1 = this._formBuilder.group({
      secondCtrlScenario1: ['', Validators.required]
    });
    this.thirdFormGroupScenario1 = this._formBuilder.group({
      thirdCtrlScenario1: ['', Validators.required]
    });
    this.fourthFormGroupScenario1 = this._formBuilder.group({
      fourthCtrlScenario1: ['', Validators.required]
    });
    this.summaryFormGroupScenario1 = this._formBuilder.group({
      summaryCtrlScenario1: ['', Validators.required]
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
