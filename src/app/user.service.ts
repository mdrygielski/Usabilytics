import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  language: string;
  testID: number;
  testStartTimestamp: string;
  testEndTimestamp: string;


  ipAddress: string;
  latitude: number;
  longitude: number;
  preciseLocation: boolean;
  geolocationError: string;
  isEu: string;
  countryName: string;
  countryCode: string;
  continentName: string;
  mobileVersion: boolean;


  datePickerDuration: number;
  datePickerIncorrectCounter: number;
  datePickerSEQRate: any;
  datePickerTitle: string;
  lastUpdate: string;
  datePickerComment: string;

  constructor() { }

}
