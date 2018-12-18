import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserService} from '../../user.service';
import {LoggingService} from '../../logging.service';

@Component({
  selector: 'app-number-spinner',
  templateUrl: './number-spinner.component.html',
  styleUrls: ['./number-spinner.component.css', '../../usability/usability.component.css']
})
export class NumberSpinnerComponent implements OnInit {
  @Output() finish = new EventEmitter<void>();
  @Input() dataType: string;
  @Input() requiredPrice: number;
  @Input() title: string;
  @Input() startTime: number;

  private endTime: number;
  private duration: number;
  private incorrectCounter: number;
  private arrowKeyCounter: number;
  public finished: boolean;

  numberSpinnerInputFormControl = new FormControl('', []);

  constructor(private userService: UserService,
              private loggingService: LoggingService) {
  }

  ngOnInit() {
    this.finished = false;
    this.incorrectCounter = 0;
    this.arrowKeyCounter = 0;
  }


  validatePrice() {
    if (this.numberSpinnerInputFormControl.value === this.requiredPrice) {
      this.endTime = Date.now();
      this.finished = true;
      this.numberSpinnerInputFormControl.setErrors(null);
      this.numberSpinnerInputFormControl.disable();
      this.duration = this.endTime - this.startTime;
    } else {
      this.numberSpinnerInputFormControl.setErrors({'incorrectPrice': true});
      this.incorrectCounter++;
    }
  }

  submitTest(obj) {
    if (this.dataType === 'price') {
      const numberInput = {
        'spinnerInputPriceTitle': this.title,
        'spinnerInputPriceDuration': this.duration,
        'spinnerInputPriceIncorrectCounter': this.incorrectCounter,
        'spinnerInputPriceArrowKeyCounter': this.arrowKeyCounter,
        'spinnerInputPriceSEQRate': obj.rate,
        'spinnerInputPriceComment': obj.comment
      };
      this.loggingService.SendData(numberInput).subscribe();
    }
    this.finish.emit();
  }

  keyCounter(event: any) {
    const charCode = event.which;
    if (charCode === 38 || charCode === 40) {
      this.arrowKeyCounter++;
    }
  }
}
