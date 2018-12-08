import { Component, OnInit } from '@angular/core';
import {LoggingService} from '../logging.service';

declare function sendMessage(): any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private loggingService: LoggingService) { }

  ngOnInit() {
  }

  // sendEmailConfirmation() {
  //     console.log('sending an email');
  //     sendMessage();
  //     console.log('email sent');
  // }

  StartTest() {
    this.loggingService.SendTestData().subscribe();
  }
}

