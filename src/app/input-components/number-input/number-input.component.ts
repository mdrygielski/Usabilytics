import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserService} from '../../user.service';
import {LoggingService} from '../../logging.service';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.css', '../../usability/usability.component.css']
})
export class NumberInputComponent implements OnInit {
  @Output() finish = new EventEmitter<void>();
  @Input() dataType: string;
  @Input() requiredInteger: string;
  @Input() requiredDecimal: string;
  @Input() title: string;
  @Input() startTime: number;

  private endTime: number;
  private duration: number;
  private incorrectCounter: number;
  public finished: boolean;
  public incorrectPrice: boolean;

  numberIntegerInputFormControl = new FormControl('', []);
  numberDecimalInputFormControl = new FormControl('', []);

  constructor(private userService: UserService,
              private loggingService: LoggingService) {
  }

  ngOnInit() {
    this.finished = false;
    this.incorrectCounter = 0;
    this.incorrectPrice = false;
  }

  validatePrice() {
    let validated = true;
    if (this.numberIntegerInputFormControl.value !== this.requiredInteger) {
      this.numberIntegerInputFormControl.setErrors({'incorrectPrice': true});
      validated = false;
    } else {
      this.numberIntegerInputFormControl.setErrors(null);
    }

    if (this.requiredDecimal === '') {
      if (this.numberDecimalInputFormControl.value === '' ||
        this.numberDecimalInputFormControl.value === null ||
        this.numberDecimalInputFormControl.value === '0' ||
        this.numberDecimalInputFormControl.value === '00') {

        this.numberDecimalInputFormControl.setErrors(null);
      } else {
        this.numberDecimalInputFormControl.setErrors({'incorrectPrice': true});
        validated = false;
      }
    } else {
      if (this.numberDecimalInputFormControl.value !== this.requiredDecimal) {
        this.numberDecimalInputFormControl.setErrors({'incorrectPrice': true});
        validated = false;
      } else {
        this.numberDecimalInputFormControl.setErrors(null);
      }

    }

    if (validated) {
      this.endTime = Date.now();
      this.finished = true;
      this.incorrectPrice = false;
      this.numberIntegerInputFormControl.disable();
      this.numberDecimalInputFormControl.disable();
      this.duration = this.endTime - this.startTime;
    } else {
      this.incorrectPrice = true;
      this.incorrectCounter++;
    }
  }


  submitTest(obj) {
    if (this.dataType === 'smallPrice') {
      const numberInput = {
        'numberInputSmallPriceDuration': this.duration,
        'numberInputSmallPriceIncorrectCounter': this.incorrectCounter,
        'numberInputSmallPriceSEQRate': obj.rate,
        'numberInputSmallPriceComment': obj.comment
      };
      this.loggingService.SendData(numberInput).subscribe();
    }
    if (this.dataType === 'bigPrice') {
      const numberInput = {
        'numberInputBigPriceDuration': this.duration,
        'numberInputBigPriceIncorrectCounter': this.incorrectCounter,
        'numberInputBigPriceSEQRate': obj.rate,
        'numberInputBigPriceComment': obj.comment
      };
      this.loggingService.SendData(numberInput).subscribe();
    }
    this.finish.emit();
  }
  
  

  NumberOnly(event: any): boolean {
    const charCode = event.which;
    // tab

    // Enter = validate
    if (charCode === 13) {
      this.validatePrice();
    }

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

  clearError($event) {
    $event.target.select();
    this.incorrectPrice = false;
    this.numberIntegerInputFormControl.setErrors(null);
    this.numberDecimalInputFormControl.setErrors(null);
  }

  changeFocus(charCode: any, element: HTMLInputElement) {
    if (charCode === 9) {
      element.focus();
    }
  }
}
