import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { IStudentGeneralForm } from '../../../models/user-form.interface';

@Component({
  selector: 'app-student-form-general',
  templateUrl: './student-form-general.component.html',
  styleUrls: ['../../../styles/_form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentFormGeneralComponent implements OnInit {
  form!: FormGroup<IStudentGeneralForm>;

  constructor(private cc: ControlContainer) {}

  ngOnInit(): void {
    this.form = this.cc.control as FormGroup;
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
