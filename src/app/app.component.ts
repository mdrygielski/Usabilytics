import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UserInfo} from './userInfo';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Usabilytics';
  ipDataURL = 'https://api.ipdata.co?api-key=8c206a3f41fe19087eeaa52f781259c5d441f1a8e911797ecf1f7a51';

  user: UserInfo = {
    language: 'en',
    ipAddress: 'unknown',
    location: {
      latitude: 0,
      longitude: 0,
      geolocationError: '',
      isEu: '',
      countryName: '',
      countryCode: '',
      continentName: '',
      flagUrl: '',
    }
  };

  constructor(private translate: TranslateService,
              private http: HttpClient) {

    this.getIPData();
    this.getLocation();

    translate.setDefaultLang(this.user.language);
  }

  private getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.user.location.latitude = position.coords.latitude;
        this.user.location.longitude = position.coords.longitude;
      }, (error) => {
        this.user.location.geolocationError = error.message;
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }


  ngOnInit() {
  }

  languageChangedHandler(lang: string) {
    console.log('languageChangedHandler: ' + lang);
    this.user.language = lang;
    this.translate.use(lang);
  }


  private getIPData() {
    this.http.get<UserResponse>(this.ipDataURL).subscribe(data => {
      this.user.ipAddress = data.ip;
      if (data.languages[0].name === 'Polish') {
        this.user.language = 'pl';
      } else {
        this.user.language = 'en';
      }
      this.languageChangedHandler(this.user.language);
      this.user.location.latitude = data.latitude;
      this.user.location.longitude = data.longitude;
      this.user.location.isEu = data.is_eu;
      this.user.location.countryName = data.country_name;
      this.user.location.countryCode = data.country_code;
      this.user.location.continentName = data.continent_name;
      this.user.location.flagUrl = data.flag;
    });
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
