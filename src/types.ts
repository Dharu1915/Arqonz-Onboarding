export interface OnboardingData {
  // Step 1: Country
  country: string;
  countryCode: string;
  countryFlag: string;
  phonePrefix: string;

  // Step 2: Email
  email: string;

  // Step 3: OTP
  otp: string[];

  // Step 4: Personal & Password
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;

  // Step 5: Company Type
  companyType: string;
  companyCategory: string;

  // Step 6: SIREN / Registration
  siren: string;
  companyName: string;
  nafCode: string;
  incorporationDate: string;
  vatNumber: string;

  // Step 7: Address
  streetAddress: string;
  addressLine2: string;
  postalCode: string;
  city: string;
  addressCountry: string;
  isBillingSame: boolean;

  // Step 8: Terms & Legal
  acceptTerms: boolean;
  subscribeNewsletter: boolean;
}

export interface StepInfo {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  shortLabel: string;
  visualTitle: string;
  visualSubtitle: string;
}

export interface CountryItem {
  name: string;
  code: string;
  flag: string;
  prefix: string;
  popular?: boolean;
}

export interface CompanyTypeOption {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tag?: string;
  recommended?: boolean;
  iconName: string;
}

export interface SirenRegistryItem {
  siren: string;
  siret: string;
  name: string;
  legalForm: string;
  nafCode: string;
  nafLabel: string;
  address: string;
  city: string;
  postalCode: string;
  dateCreated: string;
  status: 'ACTIVE' | 'REGISTERED';
}
