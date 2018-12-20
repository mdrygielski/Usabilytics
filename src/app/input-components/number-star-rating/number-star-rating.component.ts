import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../user.service';
import {LoggingService} from '../../logging.service';

@Component({
  selector: 'app-number-star-rating',
  templateUrl: './number-star-rating.component.html',
  styleUrls: ['./number-star-rating.component.css', '../../usability/usability.component.css']
})
export class NumberStarRatingComponent implements OnInit {
  @Output() finish = new EventEmitter<void>();
  @Input() dataType: string;
  @Input() requiredRate: number;
  @Input() title: string;
  @Input() startTime: number;

  public rating: number;
  public incorrectRate: boolean;

  private endTime: number;
  private duration: number;
  private incorrectCounter: number;
  public finished: boolean;

  constructor(private userService: UserService,
              private loggingService: LoggingService) {
  }

  ngOnInit() {
    this.rating = 1;
    this.finished = false;
    this.incorrectCounter = 0;
  }

  validateRate() {
    if (this.rating === this.requiredRate) {
      this.endTime = Date.now();
      this.finished = true;
      this.incorrectRate = false;
      this.duration = this.endTime - this.startTime;
    } else {
      this.incorrectRate = true;
      this.incorrectCounter++;
    }
  }

  submitTest(obj) {
    const starRating = {
      'numberStarRatingTitle': this.title,
      'numberStarRatingDuration': this.duration,
      'numberStarRatingIncorrectCounter': this.incorrectCounter,
      'numberStarRatingSEQRate': obj.rate,
      'numberStarRatingComment': obj.comment
    };
    this.loggingService.SendData(starRating).subscribe();
    this.finish.emit();
  }

  onClick(rating: number): void {
    if (!this.finished) {
      this.rating = rating;
    }
  }
}