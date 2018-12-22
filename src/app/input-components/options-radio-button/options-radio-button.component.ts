import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../user.service';
import {LoggingService} from '../../logging.service';

@Component({
  selector: 'app-options-radio-button',
  templateUrl: './options-radio-button.component.html',
  styleUrls: ['./options-radio-button.component.css', '../../usability/usability.component.css']
})
export class OptionsRadioButtonComponent implements OnInit {
  @Output() finish = new EventEmitter<void>();
  @Input() startTime: number;
  option1 = false;
  option2 = false;
  option3 = false;
  option4 = false;

  private endTime: number;
  private duration: number;
  private incorrectCounter: number;
  public finished: boolean;
  public incorrectOptions: boolean;

  constructor(private userService: UserService,
              private loggingService: LoggingService) {
  }

  ngOnInit() {
    this.finished = false;
    this.incorrectCounter = 0;
  }

  validateOptions() {
    if (this.option1 && !this.option2 && this.option3 && !this.option4) {
      this.endTime = Date.now();
      this.finished = true;
      this.incorrectOptions = false;
      this.duration = this.endTime - this.startTime;
    } else {
      this.incorrectOptions = true;
      this.incorrectCounter++;
    }
  }

  submitTest(obj) {
    const starRating = {
      'optionsRadioButtonDuration': this.duration,
      'optionsRadioButtonIncorrectCounter': this.incorrectCounter,
      'optionsRadioButtonSEQRate': obj.rate,
      'optionsRadioButtonComment': obj.comment
    };
    this.loggingService.SendData(starRating).subscribe();
    this.finish.emit();
  }

}
