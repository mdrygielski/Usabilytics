import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateAdapter, ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {UserService} from '../../user.service';
import {LoggingService} from '../../logging.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-date-editable-picker',
  templateUrl: './date-editable-picker.component.html',
  styleUrls: ['./date-editable-picker.component.css', '../../usability/usability.component.css']
})
export class DateEditablePickerComponent implements OnInit {
  @Output() finish = new EventEmitter<void>();
  @Input() dataType: string;
  @Input() requiredYear: number;
  @Input() requiredMonth: number;
  @Input() requiredDay: number;
  @Input() title: string;
  @Input() startTime: number;

  dateEditablePickerFormControl = new FormControl('', [ ]);

  matcher = new MyErrorStateMatcher();

  private endTime: number;
  private duration: number;
  private incorrectCounter: number;
  private openCalendarCounter: number;
  public finished: boolean;

  constructor(private adapter: DateAdapter<any>,
              private userService: UserService,
              private loggingService: LoggingService) {
  }

  ngOnInit() {
    this.finished = false;
    this.incorrectCounter = 0;
    this.openCalendarCounter = 0;
  }

  calendarOpened() {
    this.openCalendarCounter++;
  }

  validateDate() {
    try {
      if (this.adapter.getYear(this.dateEditablePickerFormControl.value) === this.requiredYear
        && this.adapter.getMonth(this.dateEditablePickerFormControl.value) === (this.requiredMonth - 1)
        && this.adapter.getDate(this.dateEditablePickerFormControl.value) === this.requiredDay) {
        this.endTime = Date.now();
        this.finished = true;
        this.dateEditablePickerFormControl.setErrors(null);
        this.dateEditablePickerFormControl.disable();
        this.duration = this.endTime - this.startTime;
      } else {
        this.dateEditablePickerFormControl.setErrors({'incorrectDate': true});
        this.incorrectCounter++;
      }
    } catch (error) {
      this.dateEditablePickerFormControl.setErrors({'incorrectDate': true});
      this.incorrectCounter++;
    }
  }

  submitTest(obj) {
    if (this.dataType === 'soon') {
      const soonData = {
        'dateEditablePickerSoonTitle': this.title,
        'dateEditablePickerSoonDuration': this.duration,
        'dateEditablePickerSoonOpenCalendarCounter': this.openCalendarCounter,
        'dateEditablePickerSoonIncorrectCounter': this.incorrectCounter,
        'dateEditablePickerSoonSEQRate': obj.rating,
        'dateEditablePickerSoonComment': obj.comment
      };
      this.loggingService.SendData(soonData).subscribe();
    }
    if (this.dataType === 'distant') {
      const distantData = {
        'dateEditablePickerDistantTitle': this.title,
        'dateEditablePickerDistantDuration': this.duration,
        'dateEditablePickerDistantOpenCalendarCounter': this.openCalendarCounter,
        'dateEditablePickerDistantIncorrectCounter': this.incorrectCounter,
        'dateEditablePickerDistantSEQRate': obj.rating,
        'dateEditablePickerDistantComment': obj.comment
      };
      this.loggingService.SendData(distantData).subscribe();
    }
    this.finish.emit();
  }
}
