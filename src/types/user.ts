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

export interface UserToken {
  userId: string;
  email: string;
}
