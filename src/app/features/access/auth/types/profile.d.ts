export interface Profile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
  mothersName: string;
  birthday: Date;
}

export interface ProfileMetaData {
  picture: string;
  banner: string;
  profileId: string;
}

export interface ProfileLocation {
  id: number;
  firstAddress: string;
  secondAddress: string;
  country: string;
  countryCode: string;
  city: string;
  province: string;
  provinceCode: string;
  streetNumber: string;
  zipCode: string;
  profileId: string;
}