export interface ProfileSummary {
  userId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  SSN: string;
  workAuthTitle: string;
  phoneNumber: string;
  email: string;
}

interface Address {
  street: string;
  building?: string;
  city: string;
  state: string;
  zip: string;
}

interface Car {
  make?: string;
  model?: string;
  color?: string;
}

interface WorkAuth {
  title: string;
  startDate?: string;
  endDate?: string;
}

interface DriversLicense {
  number: string;
  expiration: string;
  url: string;
}

interface Reference {
  firstName: string;
  lastName: string;
  middleName?: string;
  relationship: string;
  phone: string;
  email: string;
}

interface EmergencyContact extends Reference {}

interface ImmigrationDocument {
  url: string;
  status: string;
  feedback?: string;
}

export interface Profile {
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
  gender: string;
  profilePic?: string;
  cellPhone: string;
  workPhone?: string;
  address: Address;
  car?: Car;
  SSN: string;
  DOB: string;
  immigrationStatus: string;
  workAuth: WorkAuth;
  driversLicense?: DriversLicense;
  reference: Reference;
  emergencyContacts: EmergencyContact[];
  OPTEAD: ImmigrationDocument;
  I983: ImmigrationDocument;
  I20: ImmigrationDocument;
  applicationStatus: string;
}
