import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { IStudentGradesForm } from '../../../models/user-form.interface';
import { IStudentGrades } from '../../../models/user.interface';
import { STUDENTS_GRADES } from '../../../constants/students-grades';
import { switchMap } from 'rxjs';
import { GradeActivityLoggerService } from '../../../services/grade-activity-logger.service';

@Component({
  selector: 'app-student-form-grades',
  templateUrl: './student-form-grades.component.html',
  styleUrls: ['../../../styles/_form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentFormGradesComponent implements OnInit {
  @Output() formCreated = new EventEmitter<FormGroup<IStudentGradesForm>>();
  form!: FormGroup<IStudentGradesForm>;
  gradesCatalog: string[] = STUDENTS_GRADES;

  @Input() set age(age: number | null) {
    if (age && age >= 10) {
      this.showScienceControl = true;
    } else {
      this.showScienceControl = false;
    }
    this.form?.updateValueAndValidity();
  }
  showScienceControl: boolean = false;

  constructor(private gradeActivityLoggerService: GradeActivityLoggerService) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.valueChanges();
    this.formCreated.emit(this.form);
  }
  createForm(): FormGroup<IStudentGradesForm> {
    return new FormGroup<IStudentGradesForm>({
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
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }
  valueChanges() {
    this.form.valueChanges
      .pipe(
        switchMap(() =>
          this.gradeActivityLoggerService.logChange(
            this.form.getRawValue(),
            new Date()
          )
        )
      )
      .subscribe();
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
