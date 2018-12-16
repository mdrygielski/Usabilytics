import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  language: string;
  testID: number;
  variant: number;
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

  lastUpdate: string;

  constructor() {
    this.testID = 0;
    this.variant = 0;
  }

}
