import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  IStudentAddressForm,
  IStudentAddressFullForm,
  IStudentForm,
  IStudentGeneralForm,
  IStudentGradesForm,
} from '../../models/user-form.interface';
import {
  IStudent,
  IStudentGeneralInfo,
  IStudentGrades,
  IStudentGradesInfo,
} from '../../models/user.interface';
import { StudentAvailabilityService } from '../../services/student-availability.service';
import { existingPinValidator } from '../../validators/pin.validator';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { AddressTranslateService } from '../../../shared/services/address-translate.service';
import { GradeActivityLoggerService } from '../../services/grade-activity-logger.service';
import { areAddressesEqual } from '../../../shared/helpers/address.helper';
import { STUDENTS_GRADES } from '../../constants/students-grades';
import { Nullable } from '../../../shared/models/nullable.type';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  public _chosenStudent: IStudent | null = null;
  @Input() set chosenStudent(student: IStudent | null) {
    setTimeout(() => {
      this._chosenStudent = student;
      if (this._chosenStudent) {
        this.fillForm(this._chosenStudent);
      } else {
        this.form.reset();
      }
    });
  }
  @Output() onCancel = new EventEmitter<void>();
  @Output() register = new EventEmitter<IStudent>();
  @Output() update = new EventEmitter<IStudent>();

  form = new FormGroup<Partial<IStudentForm>>({});

  readForm(): IStudent {
    return {
      general: {
        ...(this.generalGroup!.getRawValue() as IStudentGeneralInfo),
      },
      address: {
        legal: this.legalGroup.getRawValue(),
        actual: this.actualSameAsLegal.value
          ? this.legalGroup.getRawValue()
          : this.legalGroup.getRawValue(),
      },
      grades: { ...(this.gradesGroup.getRawValue() as IStudentGradesInfo) },
    };
  }

  fillForm(student: IStudent): void {
    this.name.setValue(student.general.name);
    this.lastName.setValue(student.general.lastName);
    this.age.setValue(student.general.age);
    this.sex.setValue(student.general.sex);
    if (student.general.personalNumber) {
      this.personalNumber.setValue(student.general.personalNumber);
    }

    this.legalCountry.setValue(student.address.legal.country);
    this.legalCountryEng.setValue(student.address.legal.countryEng);
    this.legalFull.setValue(student.address.legal.full);
    this.legalFullEng.setValue(student.address.legal.fullEng);
    this.legalCountry.setValue(student.address.legal.country);
    this.legalCountry.setValue(student.address.legal.country);

    this.actualSameAsLegal.setValue(
      areAddressesEqual(student.address.legal, student.address.actual)
    );

    if (student.address.actual) {
      this.actualCountry.setValue(student.address.actual.country);
      this.actualCountryEng.setValue(student.address.actual.countryEng);
      this.actualFull.setValue(student.address.actual.full);
      this.actualFullEng.setValue(student.address.actual.fullEng);
      this.actualCountry.setValue(student.address.actual.country);
      this.actualCountry.setValue(student.address.actual.country);
    }

    this.math.setValue(student.grades.math);
    if (student.grades.science) {
      this.science.setValue(student.grades.science);
    }
    this.history.setValue(student.grades.history);
    this.arts.setValue(student.grades.arts);
    this.english.setValue(student.grades.english);
  }

  // Form getters.
  get generalGroup() {
    return this.form.controls['general']!;
  }
  get addressGroup() {
    return this.form.controls['address']!;
  }
  get gradesGroup() {
    return this.form.controls['grades']!;
  }

  // General getters
  get name() {
    return this.generalGroup!.controls.name;
  }
  get lastName() {
    return this.generalGroup!.controls.lastName;
  }
  get age() {
    return this.generalGroup!.controls.age;
  }
  get sex() {
    return this.generalGroup!.controls.sex;
  }
  get personalNumber() {
    return this.generalGroup!.controls.personalNumber;
  }

  // Address getters
  get legalGroup() {
    return this.addressGroup!.controls.legal;
  }
  get actualGroup() {
    return this.addressGroup!.controls.actual;
  }
  get actualSameAsLegal() {
    return this.addressGroup!.controls.actualSameAsLegal;
  }

  get legalCountry() {
    return this.legalGroup.controls.country;
  }
  get legalCountryEng() {
    return this.legalGroup.controls.countryEng;
  }
  get legalFull() {
    return this.legalGroup.controls.full;
  }
  get legalFullEng() {
    return this.legalGroup.controls.fullEng;
  }

  get actualCountry() {
    return this.actualGroup.controls.country;
  }
  get actualCountryEng() {
    return this.actualGroup.controls.countryEng;
  }
  get actualFull() {
    return this.actualGroup.controls.full;
  }
  get actualFullEng() {
    return this.actualGroup.controls.fullEng;
  }

  get math() {
    return this.gradesGroup!.controls.math;
  }
  get science() {
    return this.gradesGroup!.controls.science;
  }
  get history() {
    return this.gradesGroup!.controls.history;
  }
  get arts() {
    return this.gradesGroup!.controls.arts;
  }
  get english() {
    return this.gradesGroup.controls.english;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const student: IStudent = { ...this._chosenStudent, ...this.readForm() };
    this._chosenStudent
      ? this.update.emit(student)
      : this.register.emit(student);
  }
}
