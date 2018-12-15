import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../../user.service';
import {LoggingService} from '../../logging.service';
import {tryCatch} from 'rxjs/internal-compatibility';


@Component({
  selector: 'app-date-month-selector',
  templateUrl: './date-month-selector.component.html',
  styleUrls: ['./date-month-selector.component.css']
})
export class DateMonthSelectorComponent implements OnInit {
  @Output() finish = new EventEmitter<void>();
  @Input() dataType: string;
  @Input() requiredYear: number;
  @Input() requiredMonth: number;
  @Input() requiredDay: number;
  @Input() title: string;

  private startTimestamp: number;
  private endTimestamp: number;
  private duration: number;
  private incorrectCounter: number;
  public finished: boolean;
  public incorrectDate: boolean;

  dateMonthSelectorDayFormControl = new FormControl('', [
    Validators.required
  ]);
  dateMonthSelectorMonthFormControl = new FormControl('', [
    Validators.required
  ]);
  dateMonthSelectorYearFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private userService: UserService,
              private loggingService: LoggingService) {
  }

  ngOnInit() {
    this.startTimestamp = Date.now();
    this.finished = false;
    this.incorrectCounter = 0;
    this.incorrectDate = false;
  }

  validateDate() {
    let validated = true;
    if (Number(this.dateMonthSelectorDayFormControl.value) !== this.requiredDay) {
      validated = false;
      this.dateMonthSelectorDayFormControl.setErrors({'incorrectDate': true});
    } else {
      this.dateMonthSelectorDayFormControl.setErrors(null);
    }
    if (Number(this.dateMonthSelectorMonthFormControl.value) !== this.requiredMonth) {
      validated = false;
      this.dateMonthSelectorMonthFormControl.setErrors({'incorrectDate': true});
    } else {
      this.dateMonthSelectorMonthFormControl.setErrors(null);
    }
    if (Number(this.dateMonthSelectorYearFormControl.value) !== this.requiredYear) {
      validated = false;
      this.dateMonthSelectorYearFormControl.setErrors({'incorrectDate': true});
    } else {
      this.dateMonthSelectorYearFormControl.setErrors(null);
    }

    if (validated) {
      this.endTimestamp = Date.now();
      this.finished = true;
      this.incorrectDate = false;
      this.disableDates();
      this.duration = this.endTimestamp - this.startTimestamp;
    } else {
      this.incorrectDate = true;
      this.incorrectCounter++;
    }
  }

  private disableDates() {
    this.dateMonthSelectorDayFormControl.disable();
    this.dateMonthSelectorMonthFormControl.disable();
    this.dateMonthSelectorYearFormControl.disable();
  }

  submitTest(obj) {
    if (this.dataType === 'soon') {
      const soonData = {
        'dateMonthSelectorSoonTitle': this.title,
        'dateMonthSelectorSoonDuration': this.duration,
        'dateMonthSelectorSoonIncorrectCounter': this.incorrectCounter,
        'dateMonthSelectorSoonSEQRate': obj.rate,
        'dateMonthSelectorSoonComment': obj.comment
      };
      this.loggingService.SendData(soonData).subscribe();
    }
    if (this.dataType === 'distant') {
      const distantData = {
        'dateMonthSelectorDistantTitle': this.title,
        'dateMonthSelectorDistantDuration': this.duration,
        'dateMonthSelectorDistantIncorrectCounter': this.incorrectCounter,
        'dateMonthSelectorDistantSEQRate': obj.rate,
        'dateMonthSelectorDistantComment': obj.comment
      };
      this.loggingService.SendData(distantData).subscribe();
    }
    this.finish.emit();
  }

  validateDay() {
    if (this.dateMonthSelectorDayFormControl.value > 31) {
      this.dateMonthSelectorDayFormControl.setErrors({'incorrectDate': true});
    } else {
      this.dateMonthSelectorDayFormControl.setErrors(null);
    }
  }

  NumberOnly(event: any): boolean {
    const charCode = event.which;
    if (charCode !== 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  validateYear() {
    if (this.dateMonthSelectorYearFormControl.value > 3000) {
      this.dateMonthSelectorYearFormControl.setErrors({'incorrectDate': true});
    } else {
      this.dateMonthSelectorYearFormControl.setErrors(null);
    }
  }

  clearFormErrors($event) {
    this.incorrectDate = false;
    this.dateMonthSelectorDayFormControl.setErrors(null);
    this.dateMonthSelectorMonthFormControl.setErrors(null);
    this.dateMonthSelectorYearFormControl.setErrors(null);
  }
  clearError($event) {
    $event.target.select();
    this.clearFormErrors($event);
  }
}
