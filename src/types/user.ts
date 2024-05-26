export interface User {
  avatar: string;
  email: string;
  exp: number;
  iat: number;
  name: string;
  onBoarding: boolean;
  surname: string;
  userId: string;
  role: string;
}

export interface Candidate {
  name: string;
  surname: string;
  phoneNumber: string;
  currentSalary: number | string;
  desiredSalary: number | string;
  birthDate: string;
  file: Object;
}

export interface Company {
  name: string;
  surname: string;
  position: string;
  phoneNumber: string;
  companyName: string;
  companyAddress: string;
  numberOfEmployees: string | number;
  companyNIF: string;
}

export interface UserToken {
  userId: string;
  email: string;
  name: string;
  surname: string;
  role: string;
  onBoarding: boolean;
  clientId: string;
  candidateId: string;
}
