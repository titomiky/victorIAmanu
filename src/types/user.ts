export interface User {
  id: string;
  name?: string;
  avatar?: string;
  email?: string;

  [key: string]: unknown;
}

export interface Candidate {
  name: string;
  surname: string;
  phoneNumber: string;
  currentSalary: number | string;
  desiredSalary: number | string;
  birthDate: string;
  cvPdf: Object;
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
}
