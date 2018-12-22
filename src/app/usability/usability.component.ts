import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {UserService} from '../user.service';
import {SpeechRecognizerService} from '../input-components/shared/services/speech-recognizer.service';

@Component({
  selector: 'app-usability',
  templateUrl: './usability.component.html',
  styleUrls: ['./usability.component.css']
})
export class UsabilityComponent implements OnInit {
  @ViewChild('mainStepper') stepper: MatStepper;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              public userService: UserService,
              private speechRecognizer: SpeechRecognizerService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });
    this.sixthFormGroup = this._formBuilder.group({
      sixthCtrl: ['', Validators.required]
    });
    this.speechRecognizer.initialize('pl');
  }

  scenario1Done() {
    console.log('scenario 1 finished!');
    this.stepper.next();
  }

  scenario2Done() {
    console.log('scenario 2 finished!');
    this.stepper.next();
  }

  scenario3Done() {
    console.log('scenario 3 finished!');
    this.stepper.next();
  }
  scenario4Done() {
    console.log('scenario 4 finished!');
    this.stepper.next();
  }
  scenario5Done() {
    console.log('scenario 5 finished!');
    this.stepper.next();
  }
  scenario6Done() {
    console.log('scenario 6 finished!');
    this.stepper.next();
  }
}
