import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css']
})
export class AppbarComponent implements OnInit, OnChanges {

  @Output() updateLanguage: EventEmitter<string> = new EventEmitter();
  @Output() toggleInfo: EventEmitter<string> = new EventEmitter();

  alternativeLang: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.setAlternativeLang();
  }

  ngOnChanges(changes: any) {
    this.setAlternativeLang();
  }

  changeLanguage() {
    this.updateLanguage.emit(this.alternativeLang);
  }
  toggleSideBar() {
    this.toggleInfo.emit();
  }

  private setAlternativeLang() {
    if (this.userService.language === 'pl') {
      this.alternativeLang = 'en';
    } else {
      this.alternativeLang = 'pl';
    }
  }
}
