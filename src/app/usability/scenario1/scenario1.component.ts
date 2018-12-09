import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MatDatepickerInputEvent, MatStepper} from '@angular/material';


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
  firstDate1 = new FormControl();


  secondFormGroupScenario1: FormGroup;
  thirdFormGroupScenario1: FormGroup;
  fourthFormGroupScenario1: FormGroup;
  summaryFormGroupScenario1: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private adapter: DateAdapter<any>) {
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

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type === 'firstDateChanged') {
      console.log('firstDateChanged ' + event.value);
      if (this.adapter.getYear(this.firstDate1.value) === 2019
          && this.adapter.getMonth(this.firstDate1.value) === 0
          && this.adapter.getDate(this.firstDate1.value) === 18) {
        this.firstDate1.setErrors(null);
      } else {
        this.firstDate1.setErrors({'incorrectDate': true});
      }
    }

    if (type === 'secondDateChanged') {
      console.log('secondDateChanged ' + event.value);
    }
  }


  introConfirmation() {
    console.log('intro done. Starting first step');
  }

  datePickerConfirm() {
      this.stepper.next();
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
    this.finished.emit();
    console.log('step 4 - done');
  }

  firstDateUpdated() {
    console.log('first date updated!');
  }

  // private validateFirstForm(control: FormControl) {
  //   if (this.adapter.getYear(control.value) === 2019
  //     && this.adapter.getMonth(control.value) === 0
  //     && this.adapter.getDate(control.value) === 18) {
  //     console.log('correct date');
  //     this.firstDate1.setErrors(null);
  //     this.firstDate1.updateValueAndValidity({onlySelf: true});
  //   } else {
  //     console.log('incorrect date');
  //     this.firstDate1.setErrors({'incorrectDate': true});
  //   }
  // }
}
