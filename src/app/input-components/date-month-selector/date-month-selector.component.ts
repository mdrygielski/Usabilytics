import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../../user.service';
import {LoggingService} from '../../logging.service';
import {tryCatch} from 'rxjs/internal-compatibility';


@Component({
  selector: 'app-date-month-selector',
  templateUrl: './date-month-selector.component.html',
  styleUrls: ['./date-month-selector.component.css', '../../usability/usability.component.css']
})
export class DateMonthSelectorComponent implements OnInit {
  @Output() finish = new EventEmitter<void>();
  @Input() dataType: string;
  @Input() requiredYear: number;
  @Input() requiredMonth: number;
  @Input() requiredDay: number;
  @Input() title: string;
  @Input() startTime: number;

  private endTime: number;
  private duration: number;
  private incorrectCounter: number;
  public finished: boolean;
  public incorrectDate: boolean;

  dateMonthSelectorDayFormControl = new FormControl('', [ ]);
  dateMonthSelectorMonthFormControl = new FormControl('', [ ]);
  dateMonthSelectorYearFormControl = new FormControl('', [ ]);

  constructor(private userService: UserService,
              private loggingService: LoggingService) {
  }

  ngOnInit() {
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
      this.endTime = Date.now();
      this.finished = true;
      this.incorrectDate = false;
      this.disableDates();
      this.duration = this.endTime - this.startTime;
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
    // Allow number
    if ((charCode >= 48 && charCode <= 57) ||
      (charCode >= 96 && charCode <= 105)) {
      return true;
    }
    // Allow arrow keys
    if (charCode >= 37 && charCode <= 40) {
      return true;
    }
    // Allow select all
    if (charCode === 65 && event.ctrlKey) {
      return true;
    }
    // Allow contol characters
    if (charCode === 8 || charCode === 46) {
      return true;
    }
    return false;
  }

  validateYear() {
    if (this.dateMonthSelectorYearFormControl.value > 3000) {
      this.dateMonthSelectorYearFormControl.setErrors({'incorrectDate': true});
    } else {
      this.dateMonthSelectorYearFormControl.setErrors(null);
    }
  }

  clearFormErrors() {
    this.incorrectDate = false;
    this.dateMonthSelectorDayFormControl.setErrors(null);
    this.dateMonthSelectorMonthFormControl.setErrors(null);
    this.dateMonthSelectorYearFormControl.setErrors(null);
  }
  clearError($event) {
    $event.target.select();
    this.clearFormErrors();
  }
}
