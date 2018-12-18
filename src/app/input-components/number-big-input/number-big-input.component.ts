import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserService} from '../../user.service';
import {LoggingService} from '../../logging.service';

@Component({
  selector: 'app-number-big-input',
  templateUrl: './number-big-input.component.html',
  styleUrls: ['./number-big-input.component.css', '../../usability/usability.component.css']
})
export class NumberBigInputComponent implements OnInit {
  @Output() finish = new EventEmitter<void>();
  @Input() dataType: string;
  @Input() requiredValue: number;
  @Input() title: string;
  @Input() startTime: number;

  private endTime: number;
  private duration: number;
  private incorrectCounter: number;
  public finished: boolean;

  numberBigInputFormControl = new FormControl('', []);

  constructor(private userService: UserService,
              private loggingService: LoggingService) {
  }

  ngOnInit() {
    this.finished = false;
    this.incorrectCounter = 0;
  }


  validateBigInput() {
    const cleanValue = this.numberBigInputFormControl.value.replace(/[- ]/g, '');
    console.log(cleanValue);
    if (cleanValue === this.requiredValue) {
      this.endTime = Date.now();
      this.finished = true;
      this.numberBigInputFormControl.setErrors(null);
      this.numberBigInputFormControl.disable();
      this.duration = this.endTime - this.startTime;
    } else {
      this.numberBigInputFormControl.setErrors({'incorrectBigInput': true});
      this.incorrectCounter++;
    }
  }

  submitTest(obj) {
    if (this.dataType === 'barcode') {
      const numberBigInput = {
        'numberBigInputBarcodeTitle': this.title,
        'numberBigInputBarcodeDuration': this.duration,
        'numberBigInputBarcodeIncorrectCounter': this.incorrectCounter,
        'numberBigInputBarcodeSEQRate': obj.rate,
        'numberBigInputBarcodeComment': obj.comment
      };
      this.loggingService.SendData(numberBigInput).subscribe();
    }
    this.finish.emit();
  }

  NumberAndSeparatorOnly(event: any): boolean {
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

    // Allow special characters
    if (charCode === 32 || charCode === 109 || charCode === 189) {
      return true;
    }
    return false;
  }
}
