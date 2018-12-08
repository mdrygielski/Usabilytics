import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {DateAdapter, MatDatepickerInputEvent} from '@angular/material';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  datePickerFormControl = new FormControl();

  constructor(private adapter: DateAdapter<any>) { }

  ngOnInit() {
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type === 'firstDateChanged') {
      console.log('firstDateChanged ' + event.value);
      if (this.adapter.getYear(this.datePickerFormControl.value) === 2019
        && this.adapter.getMonth(this.datePickerFormControl.value) === 0
        && this.adapter.getDate(this.datePickerFormControl.value) === 18) {
        this.datePickerFormControl.setErrors(null);
      } else {
        this.datePickerFormControl.setErrors({'incorrectDate': true});
      }
    }

    if (type === 'secondDateChanged') {
      console.log('secondDateChanged ' + event.value);
    }
  }
}
