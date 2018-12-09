import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {DateAdapter} from '@angular/material';
import {UserService} from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  ipDataURL = 'https://api.ipdata.co?api-key=8c206a3f41fe19087eeaa52f781259c5d441f1a8e911797ecf1f7a51';

  constructor(private translate: TranslateService,
              private http: HttpClient,
              private adapter: DateAdapter<any>,
              private userService: UserService) {

    this.getIPData();
    this.getLocation();
    this.detectMobile();

    translate.setDefaultLang('en');
  }

  private getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userService.latitude = position.coords.latitude;
        this.userService.longitude = position.coords.longitude;
        this.userService.preciseLocation = true;
      }, (error) => {
        this.userService.geolocationError = error.message;
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }
  ngOnInit() {
  }

  languageChangedHandler(lang: string) {
    this.userService.language = lang;
    this.translate.use(lang);
    // set locale
    if (lang === 'pl') {
      this.adapter.setLocale('pl');
    } else {
      this.adapter.setLocale('en');
    }
  }

  private getIPData() {
    this.http.get<UserResponse>(this.ipDataURL).subscribe(data => {
      this.userService.ipAddress = data.ip;
      if (data.languages[0].name === 'Polish') {
        this.userService.language = 'pl';
      } else {
        this.userService.language = 'en';
      }
      this.languageChangedHandler(this.userService.language);
      this.userService.latitude = data.latitude;
      this.userService.longitude = data.longitude;
      this.userService.isEu = data.is_eu;
      this.userService.countryName = data.country_name;
      this.userService.countryCode = data.country_code;
      this.userService.continentName = data.continent_name;
    });
  }

  private detectMobile() {
    this.userService.mobileVersion = !!(navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i));
  }
}


interface UserResponse {
  ip: string;
  latitude: number;
  longitude: number;
  is_eu: string;
  country_name: string;
  country_code: string;
  continent_name: string;
  flag: string;
  languages: any;
}
