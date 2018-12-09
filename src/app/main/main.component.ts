import {Component, OnInit} from '@angular/core';
import {LoggingService} from '../logging.service';
import {UserService} from '../user.service';

declare function StartTest(): any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private data: any;

  constructor(private loggingService: LoggingService,
              private userService: UserService) {
  }

  ngOnInit() {
  }

  // sendEmailConfirmation() {
  //     console.log('sending an email');
  //     sendMessage();
  //     console.log('email sent');
  // }

  StartTest() {
    this.userService.testID = Date.now();
    this.userService.testStartTimestamp = Date();
    this.loggingService.SendAvailableData().subscribe();
  }
}

