import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css']
})
export class AppbarComponent implements OnInit {
  @Input() lang: string;

  @Output() updateLanguage: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeLanguage() {
    console.log('change language to :' + this.lang);
    this.updateLanguage.emit(this.lang);
  }
}
