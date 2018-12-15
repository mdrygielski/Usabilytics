import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../../user.service';
import {LoggingService} from '../../logging.service';

@Component({
  selector: 'app-date-full-selector',
  templateUrl: './date-full-selector.component.html',
  styleUrls: ['./date-full-selector.component.css']
})
export class DateFullSelectorComponent implements OnInit {
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
  public days = [];
  public years = [];

  dateFullSelectorDayFormControl = new FormControl('', [
    Validators.required
  ]);
  dateFullSelectorMonthFormControl = new FormControl('', [
    Validators.required
  ]);
  dateFullSelectorYearFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private userService: UserService,
              private loggingService: LoggingService) {
    for (let i = 1; i <= 31; i++) {
      this.days.push(i);
    }
    for (let i = 2019; i > 1950; i--) {
      this.years.push(i);
    }
  }

  ngOnInit() {
    this.startTimestamp = Date.now();
    this.finished = false;
    this.incorrectCounter = 0;
    this.incorrectDate = false;
  }

  validateDate() {
    let validated = true;
    if (Number(this.dateFullSelectorDayFormControl.value) !== this.requiredDay) {
      validated = false;
      this.dateFullSelectorDayFormControl.setErrors({'incorrectDate': true});
    } else {
      this.dateFullSelectorDayFormControl.setErrors(null);
    }
    if (Number(this.dateFullSelectorMonthFormControl.value) !== this.requiredMonth) {
      validated = false;
      this.dateFullSelectorMonthFormControl.setErrors({'incorrectDate': true});
    } else {
      this.dateFullSelectorMonthFormControl.setErrors(null);
    }
    if (Number(this.dateFullSelectorYearFormControl.value) !== this.requiredYear) {
      validated = false;
      this.dateFullSelectorYearFormControl.setErrors({'incorrectDate': true});
    } else {
      this.dateFullSelectorYearFormControl.setErrors(null);
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
    this.dateFullSelectorDayFormControl.disable();
    this.dateFullSelectorMonthFormControl.disable();
    this.dateFullSelectorYearFormControl.disable();
  }

  submitTest(obj) {
    if (this.dataType === 'soon') {
      const soonData = {
        'dateFullSelectorSoonTitle': this.title,
        'dateFullSelectorSoonDuration': this.duration,
        'dateFullSelectorSoonIncorrectCounter': this.incorrectCounter,
        'dateFullSelectorSoonSEQRate': obj.rate,
        'dateFullSelectorSoonComment': obj.comment
      };
      this.loggingService.SendData(soonData).subscribe();
    }
    if (this.dataType === 'distant') {
      const distantData = {
        'dateFullSelectorDistantTitle': this.title,
        'dateFullSelectorDistantDuration': this.duration,
        'dateFullSelectorDistantIncorrectCounter': this.incorrectCounter,
        'dateFullSelectorDistantSEQRate': obj.rate,
        'dateFullSelectorDistantComment': obj.comment
      };
      this.loggingService.SendData(distantData).subscribe();
    }
    this.finish.emit();
  }

  validateDay() {
    if (this.dateFullSelectorDayFormControl.value > 31) {
      this.dateFullSelectorDayFormControl.setErrors({'incorrectDate': true});
    } else {
      this.dateFullSelectorDayFormControl.setErrors(null);
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
    if (this.dateFullSelectorYearFormControl.value > 3000) {
      this.dateFullSelectorYearFormControl.setErrors({'incorrectDate': true});
    } else {
      this.dateFullSelectorYearFormControl.setErrors(null);
    }
  }

  clearError($event) {
    this.incorrectDate = false;
    this.dateFullSelectorDayFormControl.setErrors(null);
    this.dateFullSelectorMonthFormControl.setErrors(null);
    this.dateFullSelectorYearFormControl.setErrors(null);
  }

}
