import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IStudentGeneralForm } from '../../../models/user-form.interface';
import { StudentAvailabilityService } from '../../../services/student-availability.service';
import { existingPinValidator } from '../../../validators/pin.validator';
import { tap } from 'rxjs';

@Component({
  selector: 'app-student-form-general',
  templateUrl: './student-form-general.component.html',
  styleUrls: ['../../../styles/_form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentFormGeneralComponent implements OnInit {
  @Output() formCreated = new EventEmitter<FormGroup<IStudentGeneralForm>>();
  form!: FormGroup<IStudentGeneralForm>;

  constructor(private studentAvailabilityService: StudentAvailabilityService) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.valueChanges();
    this.formCreated.emit(this.form);
  }

  createForm() {
    return new FormGroup<IStudentGeneralForm>({
      age: new FormControl(null, [Validators.required]),
      personalNumber: new FormControl('', {
        asyncValidators: existingPinValidator(this.studentAvailabilityService),
      }),
      lastName: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      sex: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  valueChanges() {
    this.age.valueChanges
      .pipe(
        tap((age) => {
          if (age && age >= 18) {
            this.personalNumber.addValidators(Validators.required);
          } else {
            this.personalNumber.removeValidators([Validators.required]);
          }
          this.personalNumber.updateValueAndValidity();
        })
      )
      .subscribe();
  }

  get name() {
    return this.form.controls.name;
  }
  get lastName() {
    return this.form.controls.lastName;
  }
  get age() {
    return this.form.controls.age;
  }
  get sex() {
    return this.form.controls.sex;
  }
  get personalNumber() {
    return this.form.controls.personalNumber;
  }
}
