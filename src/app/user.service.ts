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


  datePickerSoonDuration: number;
  datePickerSoonIncorrectCounter: number;
  datePickerSoonSEQRate: any;
  datePickerSoonTitle: string;
  datePickerSoonComment: string;

  datePickerDistantDuration: number;
  datePickerDistantIncorrectCounter: number;
  datePickerDistantSEQRate: any;
  datePickerDistantTitle: string;
  datePickerDistantComment: string;


  lastUpdate: string;

  constructor() { }

}
