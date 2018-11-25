import { Component, OnInit } from '@angular/core';

declare function sendMessage(): any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  sendEmailConfirmation() {
      console.log('sending an email');
      sendMessage();
      console.log('email sent');
  }
}

