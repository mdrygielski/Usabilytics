import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatStepper} from '@angular/material';
import {UserService} from '../../user.service';
import {LoggingService} from '../../logging.service';

@Component({
  selector: 'app-scenario5',
  templateUrl: './scenario5.component.html',
  styleUrls: ['./scenario5.component.css', '../usability.component.css']
})
export class Scenario5Component implements OnInit {
  @Output() finished = new EventEmitter<void>();
  @ViewChild('stepper') stepper: MatStepper;

  stepStartTime: number;

  scenarioUnderstandable: boolean;
  scenarioUnderstandableRequiredError: boolean;
  scenarioIssues: boolean;
  scenarioIssuesRequiredError: boolean;
  scenarioComment: string;

  constructor(public userService: UserService,
              private loggingService: LoggingService) { }

  ngOnInit() {
  }

  stepConfirm() {
    this.stepper.next();
    this.stepStartTime = Date.now();
  }

  summaryConfirmation() {
    if (this.scenarioUnderstandable === undefined) {
      this.scenarioUnderstandableRequiredError = true;
    } else {
      this.scenarioUnderstandableRequiredError = false;
    }
    if (this.scenarioIssues === undefined) {
      this.scenarioIssuesRequiredError = true;
    } else {
      this.scenarioIssuesRequiredError = false;
    }

    if (!this.scenarioIssuesRequiredError && !this.scenarioUnderstandableRequiredError) {
      const scenarioData = {
        'scenario5Understandable': this.scenarioUnderstandable,
        'scenario5Issues': this.scenarioIssues,
        'scenario5Comment': this.scenarioComment,
      };
      this.loggingService.SendData(scenarioData).subscribe();
      this.finished.emit();
    }
  }

}
