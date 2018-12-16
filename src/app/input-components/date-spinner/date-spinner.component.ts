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
  selector: 'app-date-spinner',
  templateUrl: './date-spinner.component.html',
  styleUrls: ['./date-spinner.component.css', '../../usability/usability.component.css']
})
export class DateSpinnerComponent implements OnInit {
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
  private arrowKeyCounter: number;
  public finished: boolean;

  dateSpinnerFormControl = new FormControl('', [ ]);

  matcher = new MyErrorStateMatcher();

  constructor(private userService: UserService,
              private loggingService: LoggingService) { }

  ngOnInit() {
    this.finished = false;
    this.incorrectCounter = 0;
    this.arrowKeyCounter = 0;
  }

  validateDate() {
    if (this.dateSpinnerFormControl.value === this.requiredYear + '-' + this.pad(this.requiredMonth, 2) + '-' + this.requiredDay) {
      this.endTime = Date.now();
      this.finished = true;
      this.dateSpinnerFormControl.setErrors(null);
      this.dateSpinnerFormControl.disable();
      this.duration = this.endTime - this.startTime;
    } else {
      this.dateSpinnerFormControl.setErrors({'incorrectDate': true});
      this.incorrectCounter++;
    }
  }

  pad(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) { s = '0' + s; }
    return s;
  }

  submitTest(obj) {
    if (this.dataType === 'soon') {
      const soonData = {
        'dateSpinnerSoonTitle': this.title,
        'dateSpinnerSoonDuration': this.duration,
        'dateSpinnerSoonIncorrectCounter': this.incorrectCounter,
        'dateSpinnerSoonArrowKeyCounter': this.arrowKeyCounter,
        'dateSpinnerSoonSEQRate': obj.rate,
        'dateSpinnerSoonComment': obj.comment
      };
      this.loggingService.SendData(soonData).subscribe();
    }
    if (this.dataType === 'distant') {
      const distantData = {
        'dateSpinnerDistantTitle': this.title,
        'dateSpinnerDistantDuration': this.duration,
        'dateSpinnerDistantIncorrectCounter': this.incorrectCounter,
        'dateSpinnerDistantArrowKeyCounter': this.arrowKeyCounter,
        'dateSpinnerDistantSEQRate': obj.rate,
        'dateSpinnerDistantComment': obj.comment
      };
      this.loggingService.SendData(distantData).subscribe();
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
