import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatStepper} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-scenario5',
  templateUrl: './scenario5.component.html',
  styleUrls: ['./scenario5.component.css', '../usability.component.css']
})
export class Scenario5Component implements OnInit {
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

  stepConfirm() {
    this.stepper.next();
    this.stepStartTime = Date.now();
  }


  summaryConfirmation() {
    this.finished.emit();
    console.log('step 5 - done');
  }

}
