import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { IStudentGradesForm } from '../../../models/user-form.interface';
import { IStudentGrades } from '../../../models/user.interface';

@Component({
  selector: 'app-student-form-grades',
  templateUrl: './student-form-grades.component.html',
  styleUrls: ['../../../styles/_form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentFormGradesComponent implements OnInit {
  form!: FormGroup<IStudentGradesForm>;
  @Input() gradesCatalog: string[] = [];
  @Input() showScienceControl: boolean = false;
  constructor(private cc: ControlContainer) {}

  ngOnInit(): void {
    this.form = this.cc.control as FormGroup;
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
