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

  CleanStart() {
    this.userService.testID = 0;
    this.userService.attempt = 0;
    this.userService.variant = 0;

  }

  StartTest() {
    console.log(this.userService.testID);
    if (this.userService.testID === 0) {
      console.log('nowe badanie');
      this.userService.testID = Date.now();
      this.userService.variant = Math.floor(Math.random() * Math.floor(2)) + 1;
    } else {
      console.log('podejście numer: ' + this.userService.attempt + 1);
      this.userService.testID += 100000000000000;
      this.userService.attempt += 1;
    }
    this.userService.testStartTimestamp = Date();
    this.loggingService.SendAvailableData().subscribe();
  }
}

