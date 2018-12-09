import { Component, OnInit, Input, Inject } from '@angular/core';
import {FormControl} from '@angular/forms';
import {DateAdapter, MatDatepickerInputEvent} from '@angular/material';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  @Input() requiredYear: number;
  @Input() requiredMonth: number;
  @Input() requiredDay: number;

  datePickerFormControl = new FormControl();

  private startTimestamp: number;
  private endTimestamp: number;
  private incorrectCounter: number;
  public finished: boolean;


  constructor(private adapter: DateAdapter<any>,
              private userService: UserService) { }

  ngOnInit() {
    this.startTimestamp = Date.now();
    this.finished = false;
    this.incorrectCounter = 0;
  }

  showPicker(datePickerComponent) {
    if (!this.finished) {
      datePickerComponent.open();
    }
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
      console.log('firstDateChanged ' + this.requiredYear + + event.value);
      if (this.adapter.getYear(this.datePickerFormControl.value) === this.requiredYear
         && this.adapter.getMonth(this.datePickerFormControl.value) === (this.requiredMonth - 1)
         && this.adapter.getDate(this.datePickerFormControl.value) === this.requiredDay) {
        this.datePickerFormControl.setErrors(null);
        this.finished = true;
        this.endTimestamp = Date.now();
        this.userService.datePickerDuration = this.endTimestamp - this.startTimestamp;
        this.userService.datePickerIncorrectCounter = this.incorrectCounter;
      } else {
        this.datePickerFormControl.setErrors({'incorrectDate': true});
        this.incorrectCounter++;
      }

  }
}
