import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css']
})
export class AppbarComponent implements OnInit, OnChanges {

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {
  }

}
