import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserService} from '../../user.service';
import {LoggingService} from '../../logging.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css', '../../usability/usability.component.css']
})
export class TextInputComponent implements OnInit {
  @Output() finish = new EventEmitter<void>();
  @Input() dataType: string;
  @Input() requiredText: number;
  @Input() title: string;
  @Input() startTime: number;

  private endTime: number;
  private duration: number;
  private incorrectCounter: number;
  private arrowKeyCounter: number;
  public finished: boolean;

  textInputFormControl = new FormControl('', []);

  constructor(private userService: UserService,
              private loggingService: LoggingService) {
  }

  ngOnInit() {
    this.finished = false;
    this.incorrectCounter = 0;
    this.arrowKeyCounter = 0;
  }


  validateText() {
    if (this.textInputFormControl.value === this.requiredText) {
      this.endTime = Date.now();
      this.finished = true;
      this.textInputFormControl.setErrors(null);
      this.textInputFormControl.disable();
      this.duration = this.endTime - this.startTime;
    } else {
      this.textInputFormControl.setErrors({'incorrectText': true});
      this.incorrectCounter++;
    }
  }

  submitTest(obj) {
    if (this.dataType === 'simpleText') {
      const textInput = {
        'textInputSimpleTitle': this.title,
        'textInputSimpleDuration': this.duration,
        'textInputSimpleIncorrectCounter': this.incorrectCounter,
        'textInputSimpleArrowKeyCounter': this.arrowKeyCounter,
        'textInputSimpleSEQRate': obj.rating,
        'textInputSimpleComment': obj.comment
      };
      this.loggingService.SendData(textInput).subscribe();
    }
    this.finish.emit();
  }

  keyCounter(): void {
      this.arrowKeyCounter++;
  }
}
