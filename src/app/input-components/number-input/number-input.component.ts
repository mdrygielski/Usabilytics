import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {UserService} from '../../user.service';
import {LoggingService} from '../../logging.service';
import {ErrorStateMatcher} from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.css', '../../usability/usability.component.css']
})
export class NumberInputComponent implements OnInit {
  @Output() finish = new EventEmitter<void>();
  @Input() dataType: string;
  @Input() requiredNumber: number;
  @Input() title: string;
  @Input() startTime: number;

  private endTime: number;
  private duration: number;
  private incorrectCounter: number;
  public finished: boolean;

  numberInputFormControl = new FormControl('', [ ]);

  matcher = new MyErrorStateMatcher();

  constructor(private userService: UserService,
              private loggingService: LoggingService) { }

  ngOnInit() {
    this.finished = false;
    this.incorrectCounter = 0;
  }

  validateNumber() {
    if (this.numberInputFormControl.value === this.requiredNumber) {
      this.endTime = Date.now();
      this.finished = true;
      this.numberInputFormControl.setErrors(null);
      this.numberInputFormControl.disable();
      this.duration = this.endTime - this.startTime;
    } else {
      this.numberInputFormControl.setErrors({'incorrectDate': true});
      this.incorrectCounter++;
    }
    console.log('validating number, duration: ' + this.duration);
  }


  submitTest(obj) {
    if (this.dataType === 'decimal') {
      const decimalNumber = {
        'numberInputDecimalTitle': this.title,
        'numberInputDecimalDuration': this.duration,
        'numberInputDecimalIncorrectCounter': this.incorrectCounter,
        'numberInputDecimalSEQRate': obj.rate,
        'numberInputDecimalComment': obj.comment
      };
      this.loggingService.SendData(decimalNumber).subscribe();
    }
    if (this.dataType === 'small') {
      const smallNumber = {
        'numberInputSmallTitle': this.title,
        'numberInputSmallDuration': this.duration,
        'numberInputSmallIncorrectCounter': this.incorrectCounter,
        'numberInputSmallSEQRate': obj.rate,
        'numberInputSmallComment': obj.comment
      };
      this.loggingService.SendData(smallNumber).subscribe();
    }
    if (this.dataType === 'big') {
      const bigNumber = {
        'numberInputBigTitle': this.title,
        'numberInputBigDuration': this.duration,
        'numberInputBigIncorrectCounter': this.incorrectCounter,
        'numberInputBigSEQRate': obj.rate,
        'numberInputBigComment': obj.comment
      };
      this.loggingService.SendData(bigNumber).subscribe();
    }
    this.finish.emit();
  }

}
