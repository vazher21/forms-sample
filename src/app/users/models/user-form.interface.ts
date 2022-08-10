import { FormControl, FormGroup } from '@angular/forms';
import { IStudentGrades } from './user.interface';

export interface IStudentForm {
  general: FormGroup<IStudentGeneralForm>;
  address: FormGroup<IStudentAddressFullForm>;
  grades: FormGroup<IStudentGradesForm>;
}

export interface IStudentGeneralForm {
  name: FormControl<string>;
  lastName: FormControl<string>;
  sex: FormControl<string>;
  personalNumber: FormControl<string | null>;
  age: FormControl<number | null>;
}

export interface IStudentAddressFullForm {
  legal: FormGroup<IStudentAddressForm>;
  actual: FormGroup<IStudentAddressForm>;
  actualSameAsLegal: FormControl<boolean | null>;
}

export interface IStudentAddressForm {
  country: FormControl<string>;
  countryEng: FormControl<string>;
  full: FormControl<string>;
  fullEng: FormControl<string>;
}

export interface IStudentGradesForm {
  math: FormControl<IStudentGrades | null>;
  history: FormControl<IStudentGrades | null>;
  arts: FormControl<IStudentGrades | null>;
  science: FormControl<IStudentGrades | null>;
  english: FormControl<IStudentGrades | null>;
}
