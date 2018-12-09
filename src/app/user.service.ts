import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  public language: string;
  public testID: number;
  public testStartTimestamp: string;
  public testEndTimestamp: string;


  public ipAddress: string;
  public latitude: number;
  public longitude: number;
  public preciseLocation: boolean;
  public geolocationError: string;
  public isEu: string;
  public countryName: string;
  public countryCode: string;
  public continentName: string;
  public mobileVersion: boolean;


  public datePickerDuration: number;
  public datePickerIncorrectCounter: number;

  constructor() { }

}
