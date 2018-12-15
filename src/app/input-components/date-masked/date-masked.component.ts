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

  private startTimestamp: number;
  private endTimestamp: number;
  private duration: number;
  private incorrectCounter: number;
  public finished: boolean;

  dateMaskedFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private userService: UserService,
              private loggingService: LoggingService) {
  }

  ngOnInit() {
    this.startTimestamp = Date.now();
    this.finished = false;
    this.incorrectCounter = 0;
  }

  validateDate() {
    if (this.dateMaskedFormControl.value === this.requiredYear + '-' + this.requiredMonth + '-' + this.requiredDay) {
      this.endTimestamp = Date.now();
      this.finished = true;
      this.dateMaskedFormControl.setErrors(null);
      this.dateMaskedFormControl.disable();
      this.duration = this.endTimestamp - this.startTimestamp;
    } else {
      this.dateMaskedFormControl.setErrors({'incorrectDate': true});
      this.incorrectCounter++;
    }
  }

  submitTest(obj) {
    if (this.dataType === 'soon') {
      const soonData = {
        'dateMaskedSoonTitle': this.title,
        'dateMaskedSoonDuration': this.duration,
        'dateMaskedSoonIncorrectCounter': this.incorrectCounter,
        'dateMaskedSoonSEQRate': obj.rate,
        'dateMaskedSoonComment': obj.comment
      };
      this.loggingService.SendData(soonData).subscribe();
    }
    if (this.dataType === 'distant') {
      const distantData = {
        'dateMaskedDistantTitle': this.title,
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
    if (charCode !== 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
