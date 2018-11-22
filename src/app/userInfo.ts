export class UserInfo {
  language: string;
  ipAddress: string;
  location: {
    latitude: number;
    longitude: number;
    preciseLocation: boolean;
    geolocationError: string;
    isEu: string;
    countryName: string;
    countryCode: string;
    continentName: string;
    flagUrl: string;
  };
  mobileVersion: boolean;
}
