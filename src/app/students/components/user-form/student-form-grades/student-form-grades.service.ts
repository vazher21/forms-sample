import { Injectable } from '@angular/core';
import { BaseStepService } from '../../../../shared/models/base-step-service';
import {
  IStudentGrades,
  IStudentGradesInfo,
} from '../../../models/user.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IStudentGradesForm } from '../../../models/user-form.interface';
import { BehaviorSubject, shareReplay, Subject, tap } from 'rxjs';
import { StudentFormGeneralService } from '../student-form-general/student-form-general.service';

@Injectable()
export class StudentFormGradesService
  implements BaseStepService<IStudentGradesInfo>
{
  private _showScienceControl$ = new BehaviorSubject(false);
  public showScienceControl$ = this._showScienceControl$.pipe(shareReplay(1));
  detectChanges$ = new Subject<void>();

  constructor(private studentFormGeneralService: StudentFormGeneralService) {
    this.valueChanges();
  }

  reset() {
    this.form.reset();
  }

  markAllAsTouched() {
    this.form.markAllAsTouched();
  }

  fillForm(grades: IStudentGradesInfo): void {
    this.math.setValue(grades.math);
    if (grades.science) {
      this.science.setValue(grades.science);
    }
    this.history.setValue(grades.history);
    this.arts.setValue(grades.arts);
    this.english.setValue(grades.english);
  }

  valueChanges() {
    this.studentFormGeneralService.age.valueChanges
      .pipe(
        tap((age) => {
          if (age && age >= 10) {
            this.science.setValidators(Validators.required);
            this._showScienceControl$.next(true);
          } else {
            this.science.clearValidators();
            this._showScienceControl$.next(false);
          }
          this.science?.updateValueAndValidity();
        })
      )
      .subscribe();
  }
  form = new FormGroup<IStudentGradesForm>({
    math: new FormControl<IStudentGrades | null>(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    history: new FormControl<IStudentGrades | null>(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    arts: new FormControl<IStudentGrades | null>(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    english: new FormControl<IStudentGrades | null>(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    science: new FormControl<IStudentGrades | null>(null, {
      nonNullable: true,
    }),
  });

  isValid(): boolean {
    return !this.form.invalid;
  }

  readForm(): IStudentGradesInfo {
    return this.form.getRawValue() as IStudentGradesInfo;
  }

  get math() {
    return this.form.controls.math;
  }
  get science() {
    return this.form.controls.science;
  }
  get history() {
    return this.form.controls.history;
  }
  get arts() {
    return this.form.controls.arts;
  }
  get english() {
    return this.form.controls.english;
  }
}
