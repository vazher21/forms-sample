import { IAddress } from '../../shared/models/address.interface';

export interface IStudent {
  id?: number;
  general: IStudentGeneralInfo;
  address: IStudentAddressInfo;
  grades: IStudentGradesInfo;
}

export interface IStudentGeneralInfo {
  name: string;
  lastName: string;
  sex: string;
  age: number;
  personalNumber?: string;
}

export interface IStudentAddressInfo {
  legal: IAddress;
  actual: IAddress;
}

export interface IStudentGradesInfo {
  math: IStudentGrades;
  history: IStudentGrades;
  english: IStudentGrades;
  science: IStudentGrades;
  arts: IStudentGrades;
}

export enum IStudentGrades {
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
}
