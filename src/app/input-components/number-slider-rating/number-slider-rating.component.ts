import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserService} from '../../user.service';
import {LoggingService} from '../../logging.service';

@Component({
  selector: 'app-number-slider-rating',
  templateUrl: './number-slider-rating.component.html',
  styleUrls: ['./number-slider-rating.component.css', '../../usability/usability.component.css']
})
export class NumberSliderRatingComponent implements OnInit {
  @Output() finish = new EventEmitter<void>();
  @Input() dataType: string;
  @Input() requiredRate: number;
  @Input() title: string;
  @Input() startTime: number;

  public incorrectRate: boolean;

  private endTime: number;
  private duration: number;
  private incorrectCounter: number;
  private arrowKeyCounter: number;
  public finished: boolean;

  numberSliderRatingInputFormControl = new FormControl('', []);

  constructor(private userService: UserService,
              private loggingService: LoggingService) {
  }

  ngOnInit() {
    this.finished = false;
    this.incorrectCounter = 0;
    this.arrowKeyCounter = 0;
  }

  validateRate() {
    console.log(this.numberSliderRatingInputFormControl.value);
    if (this.numberSliderRatingInputFormControl.value === this.requiredRate) {
      this.endTime = Date.now();
      this.finished = true;
      this.incorrectRate = false;
      this.numberSliderRatingInputFormControl.disable();
      this.duration = this.endTime - this.startTime;
    } else {
      this.incorrectRate = true;
      this.incorrectCounter++;
    }
  }

  submitTest(obj) {
    const numberSliderRate = {
      'sliderRateInputDuration': this.duration,
      'sliderRateInputIncorrectCounter': this.incorrectCounter,
      'sliderRateInputArrowKeyCounter': this.arrowKeyCounter,
      'sliderRateInputSEQRate': obj.rate,
      'sliderRateInputComment': obj.comment
    };
    this.loggingService.SendData(numberSliderRate).subscribe();
    this.finish.emit();
  }

  keyCounter(event: any) {
    const charCode = event.which;
    if (charCode >= 37 && charCode <= 40) {
      this.arrowKeyCounter++;
    }
  }
}
