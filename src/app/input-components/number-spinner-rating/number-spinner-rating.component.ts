import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserService} from '../../user.service';
import {LoggingService} from '../../logging.service';

@Component({
  selector: 'app-number-spinner-rating',
  templateUrl: './number-spinner-rating.component.html',
  styleUrls: ['./number-spinner-rating.component.css', '../../usability/usability.component.css']
})
export class NumberSpinnerRatingComponent implements OnInit {
  @Output() finish = new EventEmitter<void>();
  @Input() dataType: string;
  @Input() requiredRate: number;
  @Input() title: string;
  @Input() startTime: number;

  private endTime: number;
  private duration: number;
  private incorrectCounter: number;
  private arrowKeyCounter: number;
  public finished: boolean;

  numberSpinnerRatingInputFormControl = new FormControl('', []);

  constructor(private userService: UserService,
              private loggingService: LoggingService) {
  }

  ngOnInit() {
    this.finished = false;
    this.incorrectCounter = 0;
    this.arrowKeyCounter = 0;
  }

  validateRate() {
    if (this.numberSpinnerRatingInputFormControl.value === this.requiredRate) {
      this.endTime = Date.now();
      this.finished = true;
      this.numberSpinnerRatingInputFormControl.setErrors(null);
      this.numberSpinnerRatingInputFormControl.disable();
      this.duration = this.endTime - this.startTime;
    } else {
      this.numberSpinnerRatingInputFormControl.setErrors({'incorrectRate': true});
      this.incorrectCounter++;
    }
  }

  submitTest(obj) {
      const numberSpinnerRate = {
        'spinnerRateInputTitle': this.title,
        'spinnerRateInputDuration': this.duration,
        'spinnerRateInputIncorrectCounter': this.incorrectCounter,
        'spinnerRateInputArrowKeyCounter': this.arrowKeyCounter,
        'spinnerRateInputSEQRate': obj.rating,
        'spinnerRateInputComment': obj.comment
      };
      this.loggingService.SendData(numberSpinnerRate).subscribe();
    this.finish.emit();
  }

  keyValidatorAndCounter(event: any): boolean {
    const charCode = event.which;

    // Allow contol characters
    if (charCode === 8 || charCode === 46) {
      return true;
    }

    if (charCode === 38 || charCode === 40) {
      this.arrowKeyCounter++;
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

    // Allow number
    if ((charCode >= 48 && charCode <= 57) ||
      (charCode >= 96 && charCode <= 105)) {

      if (this.numberSpinnerRatingInputFormControl.value === 0) {
        return true;
      }
      if (this.numberSpinnerRatingInputFormControl.value === 1 &&
        (charCode === 48 || charCode === 96)) {
        return true;
      }
      if (this.numberSpinnerRatingInputFormControl.value === undefined ||
        this.numberSpinnerRatingInputFormControl.value === null ||
        this.numberSpinnerRatingInputFormControl.value === '') {
        return true;
      }
    }
    return false;
  }

}
