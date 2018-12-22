import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UserService} from '../../user.service';
import {LoggingService} from '../../logging.service';

export interface SelectOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-test-summary',
  templateUrl: './test-summary.component.html',
  styleUrls: ['./test-summary.component.css']
})
export class TestSummaryComponent implements OnInit {
  public ageRange: string;
  public gender: string;
  public educationType: string;
  public profession: string;
  public computerUse: string;

  ageRanges: SelectOptions[] = [
    {value: '0-10', viewValue: 'Mniej niż 10 lat'},
    {value: '10-15', viewValue: '10-15 lat'},
    {value: '15-20', viewValue: '15-20 lat'},
    {value: '20-25', viewValue: '20-25 lat'},
    {value: '25-30', viewValue: '25-30 lat'},
    {value: '30-35', viewValue: '30-35 lat'},
    {value: '35-40', viewValue: '35-40 lat'},
    {value: '40-50', viewValue: '40-50 lat'},
    {value: '50-60', viewValue: '50-60 lat'},
    {value: '60-100', viewValue: 'Powyżej 60 lat'}
  ];

  genders: SelectOptions[] = [
    {value: 'K', viewValue: 'Kobieta'},
    {value: 'M', viewValue: 'Mężczyzna'}
  ];

  educationTypes: SelectOptions[] = [
    {value: 'podstawowe', viewValue: 'Wykształcenie podstawowe'},
    {value: 'gimnazjum', viewValue: 'Wykształcenie gimnazjalne'},
    {value: 'zasadnicze', viewValue: 'Wykształcenie zasadnicze'},
    {value: 'srednie', viewValue: 'Wykształcenie średnie'},
    {value: 'licencjat', viewValue: 'Wykształcenie Wyższe I stopnia - licencjackie'},
    {value: 'inzynier', viewValue: 'Wykształcenie Wyższe I stopnia - inżynierskie'},
    {value: 'magister', viewValue: 'Wykształcenie Wyższe II stopnia - magisterskie'},
    {value: 'doktor', viewValue: 'Wykształcenie Wyższe III stopnia - doktoranckie'},
  ];

  computerUses: SelectOptions[] = [
    {value: 'moreThan8h', viewValue: 'Codziennie (powyżej 8 godzin)'},
    {value: 'moreThan2h', viewValue: 'Codziennie (powyżej 2 godzin)'},
    {value: 'lessThan2h', viewValue: 'Codziennie (mniej niż 2 godziny)'},
    {value: 'FewTimesAWeek', viewValue: 'Kilka razy w tygodniu'},
    {value: 'FewTimesAMonth', viewValue: 'Kilka razy w miesiącu'},
    {value: 'FewTimesAYear', viewValue: 'Kilka razy w roku'},
  ];






  constructor(private userService: UserService,
              private loggingService: LoggingService) { }

  ngOnInit() {
  }

  testConfirmation() {
    console.log(this.ageRange);
    console.log(this.gender);
    console.log(this.educationType);
    console.log(this.profession);
    console.log(this.computerUse);
    if (this.ageRange != null &&
      this.gender != null &&
      this.educationType != null &&
      this.profession != null &&
      this.computerUse != null) {

      console.log('done');

      this.userService.testEndTimestamp = Date();

      const starRating = {
        'testEndTimestamp': this.userService.testEndTimestamp,
        'ageRange': this.ageRange,
        'gender': this.gender,
        'educationType': this.educationType,
        'profession': this.profession,
        'computerUse': this.computerUse,
      };
      this.loggingService.SendData(starRating).subscribe();


      console.log('test finished');

    }


  }
}
