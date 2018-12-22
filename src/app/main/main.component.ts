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

  constructor(private loggingService: LoggingService,
              private userService: UserService) {
  }

  ngOnInit() {
  }

  StartTest() {
    this.userService.variant = Math.floor(Math.random() * Math.floor(2)) + 1;
    this.userService.testID = Date.now();
    this.userService.testStartTimestamp = Date();
    this.loggingService.SendAvailableData().subscribe();
  }
}

