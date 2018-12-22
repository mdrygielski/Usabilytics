import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-scenario4',
  templateUrl: './scenario4.component.html',
  styleUrls: ['./scenario4.component.css', '../usability.component.css']
})
export class Scenario4Component implements OnInit {
  @Output() finished = new EventEmitter<void>();
  @ViewChild('stepper') stepper: MatStepper;

  stepStartTime: number;

  summaryFormGroupScenario3: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              public userService: UserService) { }

  ngOnInit() {
    this.summaryFormGroupScenario3 = this._formBuilder.group({
      summaryCtrlScenario3: ['', Validators.required]
    });
  }

  introConfirmation() {
    console.log('intro done. Starting first step');
  }

  stepConfirm() {
    this.stepper.next();
    this.stepStartTime = Date.now();
  }


  summaryConfirmation() {
    this.finished.emit();
    console.log('step 2 - done');
  }
}
