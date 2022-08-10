import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IStudent } from '../../models/user.interface';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsListComponent implements OnInit {
  _students: IStudentForTable[] = [];
  _originalStudents: IStudent[] = [];
  @Input() set students(students: IStudent[]) {
    this._originalStudents = students;
    this._students = students?.map((student) => {
      return {
        name: student.general.name,
        lastName: student.general.lastName,
        age: student.general.age,
        address: student.address.legal.full,
        sex: student.general.sex,
        id: student.id,
      };
    });
  }
  @Output() onEdit = new EventEmitter<IStudent>();
  @Output() onDelete = new EventEmitter<number>();
  displayedColumns: string[] = [
    'name',
    'lastName',
    'age',
    'sex',
    'address',
    'actions',
  ];

  constructor() {}

  ngOnInit(): void {}

  onEditClick(id: number) {
    this.onEdit.emit(
      this._originalStudents.find((student) => student.id === id)
    );
  }
}

interface IStudentForTable {
  name: string;
  lastName: string;
  age: number;
  sex: string;
  address: string;
}
