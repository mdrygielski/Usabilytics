import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
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
  selector: 'app-date-masked',
  templateUrl: './date-masked.component.html',
  styleUrls: ['./date-masked.component.css', '../../usability/usability.component.css']
})
export class DateMaskedComponent implements OnInit {
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

  dateMaskedFormControl = new FormControl('', [ ]);

  matcher = new MyErrorStateMatcher();

  constructor(private userService: UserService,
              private loggingService: LoggingService) {
  }

  ngOnInit() {
    this.finished = false;
    this.incorrectCounter = 0;
  }

  validateDate() {
    if (this.dateMaskedFormControl.value === this.requiredYear + '-' + this.pad(this.requiredMonth, 2)  + '-' + this.requiredDay) {
      this.endTime = Date.now();
      this.finished = true;
      this.dateMaskedFormControl.setErrors(null);
      this.dateMaskedFormControl.disable();
      this.duration = this.endTime - this.startTime;
    } else {
      this.dateMaskedFormControl.setErrors({'incorrectDate': true});
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
        'dateMaskedSoonDuration': this.duration,
        'dateMaskedSoonIncorrectCounter': this.incorrectCounter,
        'dateMaskedSoonSEQRate': obj.rate,
        'dateMaskedSoonComment': obj.comment
      };
      this.loggingService.SendData(soonData).subscribe();
    }
    if (this.dataType === 'distant') {
      const distantData = {
        'dateMaskedDistantDuration': this.duration,
        'dateMaskedDistantIncorrectCounter': this.incorrectCounter,
        'dateMaskedDistantSEQRate': obj.rate,
        'dateMaskedDistantComment': obj.comment
      };
      this.loggingService.SendData(distantData).subscribe();
    }
    this.finish.emit();
  }

  NumberOnly(event: any): boolean {
    const charCode = event.which;

    // Enter = validate
    if (charCode === 13) {
      this.validateDate();
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
}
