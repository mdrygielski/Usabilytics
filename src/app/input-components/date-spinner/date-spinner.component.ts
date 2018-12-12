import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ErrorStateMatcher, MatDatepickerInputEvent} from '@angular/material';
import {UserService} from '../../user.service';
import {LoggingService} from '../../logging.service';

@Component({
  selector: 'app-date-spinner',
  templateUrl: './date-spinner.component.html',
  styleUrls: ['./date-spinner.component.css']
})
export class DateSpinnerComponent implements OnInit {
  @Output() finish = new EventEmitter<void>();
  @Input() dataType: string;
  @Input() requiredYear: number;
  @Input() requiredMonth: number;
  @Input() requiredDay: number;
  @Input() title: string;

  dateSpinnerFormControl = new FormControl();

  private startTimestamp: number;
  private endTimestamp: number;
  private duration: number;
  private incorrectCounter: number;
  public finished: boolean;

  customErrorStateMatcher: ErrorStateMatcher = {
    isErrorState: () => {
      return this.dateSpinnerFormControl.getError('incorrectDate');
    }
  };

  constructor(private userService: UserService,
              private loggingService: LoggingService) { }

  ngOnInit() {
    this.startTimestamp = Date.now();
    this.finished = false;
    this.incorrectCounter = 0;
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    console.log('Event invoked!');
    // if (this.adapter.getYear(this.dateSpinnerFormControl.value) === this.requiredYear
    //   && this.adapter.getMonth(this.dateSpinnerFormControl.value) === (this.requiredMonth - 1)
    //   && this.adapter.getDate(this.dateSpinnerFormControl.value) === this.requiredDay) {
    //   this.dateSpinnerFormControl.setErrors(null);
    //   this.finished = true;
    //   this.endTimestamp = Date.now();
    //   this.duration = this.endTimestamp - this.startTimestamp;
    // } else {
    //   this.dateSpinnerFormControl.setErrors({'incorrectDate': true});
    //   this.incorrectCounter++;
    // }
  }


  submitTest(obj) {
    console.log('test submited!');
    // if (this.type === 'soon') {
    //   const soonData = {
    //     'datePickerSoonTitle': this.title,
    //     'datePickerSoonDuration': this.duration,
    //     'datePickerSoonIncorrectCounter': this.incorrectCounter,
    //     'datePickerSoonSEQRate': obj.rate,
    //     'datePickerSoonComment': obj.comment
    //   };
    //   this.loggingService.SendData(soonData).subscribe();
    // }
    // if (this.type === 'distant') {
    //   const distantData = {
    //     'datePickerDistantTitle': this.title,
    //     'datePickerDistantDuration': this.duration,
    //     'datePickerDistantIncorrectCounter': this.incorrectCounter,
    //     'datePickerDistantSEQRate': obj.rate,
    //     'datePickerDistantComment': obj.comment
    //   };
    //   this.loggingService.SendData(distantData).subscribe();
    // }
    // this.finish.emit();
  }

}
