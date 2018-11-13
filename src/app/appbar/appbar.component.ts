import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css']
})
export class AppbarComponent implements OnInit {
  selected = 'option2';
  constructor() { }

  ngOnInit() {
  }

  changeLang(newLang) {
    console.log(this.selected + ' -> change language to :' + newLang);
    localStorage.setItem('Language', newLang);
    // location.reload(true);
  }
}