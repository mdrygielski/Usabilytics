import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-scenario4',
  templateUrl: './scenario4.component.html',
  styleUrls: ['./scenario4.component.css', '../usability.component.css']
})
export class Scenario4Component implements OnInit {
  @Output() finished = new EventEmitter<void>();

  firstFormGroupScenario3: FormGroup;
  secondFormGroupScenario3: FormGroup;
  summaryFormGroupScenario3: FormGroup;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroupScenario3 = this._formBuilder.group({
      firstCtrlScenario3: ['', Validators.required]
    });
    this.secondFormGroupScenario3 = this._formBuilder.group({
      secondCtrlScenario3: ['', Validators.required]
    });
    this.summaryFormGroupScenario3 = this._formBuilder.group({
      summaryCtrlScenario3: ['', Validators.required]
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

  summaryConfirmation() {
    this.finished.emit();
    console.log('step 2 - done');
  }
}
