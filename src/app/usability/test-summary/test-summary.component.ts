import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {LoggingService} from '../../logging.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

export interface SelectOptions {
  value: string;
  viewValue: string;
}
export interface DialogData {
  secretKey: string;
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
  public webAppUse: string;
  public secretKey: string;

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

  webAppUseOption: SelectOptions[] = [
    {value: 'moreThan8h', viewValue: 'Codziennie (powyżej 8 godzin)'},
    {value: 'moreThan2h', viewValue: 'Codziennie (powyżej 2 godzin)'},
    {value: 'lessThan2h', viewValue: 'Codziennie (mniej niż 2 godziny)'},
    {value: 'FewTimesAWeek', viewValue: 'Kilka razy w tygodniu'},
    {value: 'FewTimesAMonth', viewValue: 'Kilka razy w miesiącu'},
    {value: 'FewTimesAYear', viewValue: 'Kilka razy w roku'},
  ];


  constructor(private userService: UserService,
              private loggingService: LoggingService,
              public dialog: MatDialog) {
    this.secretKey = '';
  }

  ngOnInit() {
  }

  testConfirmation() {
    if (this.ageRange != null &&
      this.gender != null &&
      this.educationType != null &&
      this.profession != null &&
      this.webAppUse != null) {

      this.openDialog();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      width: '450px',
      data: {secretKey: this.secretKey}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.secretKey = result;
      this.userService.testEndTimestamp = Date();

      const testConfirmation = {
        'testEndTimestamp': this.userService.testEndTimestamp,
        'ageRange': this.ageRange,
        'gender': this.gender,
        'educationType': this.educationType,
        'profession': this.profession,
        'webAppUse': this.webAppUse,
        'confirmationKey': this.secretKey,
      };
      this.loggingService.SendData(testConfirmation).subscribe();

    });
  }
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
