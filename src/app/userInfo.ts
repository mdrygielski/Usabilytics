export class UserInfo {
  language: string;
  ipAddress: string;
  location: {
    latitude: number;
    longitude: number;
    geolocationError: string;
    isEu: string;
    countryName: string;
    countryCode: string;
    continentName: string;
    flagUrl: string;
  };
}
