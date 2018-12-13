import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {UserService} from '../../user.service';
import {LoggingService} from '../../logging.service';

@Component({
  selector: 'app-date-masked',
  templateUrl: './date-masked.component.html',
  styleUrls: ['./date-masked.component.css']
})
export class DateMaskedComponent implements OnInit {
  @Output() finish = new EventEmitter<void>();
  @Input() dataType: string;
  @Input() requiredYear: number;
  @Input() requiredMonth: number;
  @Input() requiredDay: number;
  @Input() title: string;

  dateMaskedFormControl = new FormControl();

  private startTimestamp: number;
  private endTimestamp: number;
  private duration: number;
  private incorrectCounter: number;
  public finished: boolean;


  constructor(private userService: UserService,
              private loggingService: LoggingService) { }

  ngOnInit() {
    this.startTimestamp = Date.now();
    this.finished = false;
    this.incorrectCounter = 0;
  }

  addEvent() {
    if (this.dateMaskedFormControl.value === this.requiredYear + '-' + this.requiredMonth + '-' + this.requiredDay) {
      this.dateMaskedFormControl.setErrors(null);
      this.dateMaskedFormControl.disable();
      this.finished = true;
      this.endTimestamp = Date.now();
      this.duration = this.endTimestamp - this.startTimestamp;
    } else {
      this.dateMaskedFormControl.setErrors({'incorrectDate': true});
      this.incorrectCounter++;
    }
  }

  submitTest(obj) {
    console.log('test submited!');
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

}
