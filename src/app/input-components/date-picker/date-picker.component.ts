import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {DateAdapter, ErrorStateMatcher} from '@angular/material';
import {UserService} from '../../user.service';
import {LoggingService} from '../../logging.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css', '../../usability/usability.component.css']
})
export class DatePickerComponent implements OnInit {
  @Output() finish = new EventEmitter<void>();
  @Input() dataType: string;
  @Input() requiredYear: number;
  @Input() requiredMonth: number;
  @Input() requiredDay: number;
  @Input() title: string;
  @Input() startTime: number;

  datePickerFormControl = new FormControl('', [ ]);

  matcher = new MyErrorStateMatcher();

  private endTime: number;
  private duration: number;
  private incorrectCounter: number;
  private modificationCounter: number;
  public finished: boolean;

  constructor(private adapter: DateAdapter<any>,
              private userService: UserService,
              private loggingService: LoggingService) { }

  ngOnInit() {
    this.finished = false;
    this.incorrectCounter = 0;
    this.modificationCounter = 0;
  }

  showPicker(datePickerComponent) {
    if (!this.finished && !datePickerComponent.opened) {
      this.modificationCounter++;
      datePickerComponent.open();
    }
  }

  validateDate() {
      if (this.adapter.getYear(this.datePickerFormControl.value) === this.requiredYear
         && this.adapter.getMonth(this.datePickerFormControl.value) === (this.requiredMonth - 1)
         && this.adapter.getDate(this.datePickerFormControl.value) === this.requiredDay) {
        this.endTime = Date.now();
        this.finished = true;
        this.datePickerFormControl.setErrors(null);
        this.datePickerFormControl.disable();
        this.duration = this.endTime - this.startTime;
      } else {
        this.datePickerFormControl.setErrors({'incorrectDate': true});
        this.incorrectCounter++;
      }
  }


  submitTest(obj) {
    if (this.dataType === 'soon') {
        const soonData = {
          'datePickerSoonTitle': this.title,
          'datePickerSoonDuration': this.duration,
          'datePickerSoonModificationCounter': this.modificationCounter,
          'datePickerSoonIncorrectCounter': this.incorrectCounter,
          'datePickerSoonSEQRate': obj.rate,
          'datePickerSoonComment': obj.comment
        };
      this.loggingService.SendData(soonData).subscribe();
    }
    if (this.dataType === 'distant') {
      const distantData = {
        'datePickerDistantTitle': this.title,
        'datePickerDistantDuration': this.duration,
        'datePickerDistantModificationCounter': this.modificationCounter,
        'datePickerDistantIncorrectCounter': this.incorrectCounter,
        'datePickerDistantSEQRate': obj.rate,
        'datePickerDistantComment': obj.comment
      };
      this.loggingService.SendData(distantData).subscribe();
    }
    this.finish.emit();
  }

}
