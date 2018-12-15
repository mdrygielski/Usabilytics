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
  styleUrls: ['./date-spinner.component.css']
})
export class DateSpinnerComponent implements OnInit {
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

  dateSpinnerFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private userService: UserService,
              private loggingService: LoggingService) { }

  ngOnInit() {
    this.startTimestamp = Date.now();
    this.finished = false;
    this.incorrectCounter = 0;
  }

  validateDate() {
    if (this.dateSpinnerFormControl.value === this.requiredYear + '-' + this.requiredMonth + '-' + this.requiredDay) {
      console.log('Correct date');
      this.dateSpinnerFormControl.setErrors(null);
      this.dateSpinnerFormControl.disable();
      this.finished = true;
      this.endTimestamp = Date.now();
      this.duration = this.endTimestamp - this.startTimestamp;
    } else {
      console.log('Correct date');
      this.dateSpinnerFormControl.setErrors({'incorrectDate': true});
      this.incorrectCounter++;
    }
  }


  submitTest(obj) {
    console.log('test submited!');
    if (this.dataType === 'soon') {
      const soonData = {
        'dateSpinnerSoonTitle': this.title,
        'dateSpinnerSoonDuration': this.duration,
        'dateSpinnerSoonIncorrectCounter': this.incorrectCounter,
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
        'dateSpinnerDistantSEQRate': obj.rate,
        'dateSpinnerDistantComment': obj.comment
      };
      this.loggingService.SendData(distantData).subscribe();
    }
    this.finish.emit();
  }

}
