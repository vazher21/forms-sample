import { Component, OnInit } from '@angular/core';
import { IStudent } from './models/user.interface';
import { StudentsHttpService } from './services/students-http.service';
import {
  BehaviorSubject,
  merge,
  Observable,
  of,
  ReplaySubject,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  registrationMode = false;
  selectedStudent: IStudent | null = null;
  private refetch$ = new ReplaySubject<void>(1);
  students$ = this.refetch$.pipe(
    switchMap(() => this.studentsHttpService.getStudents())
  );

  constructor(private studentsHttpService: StudentsHttpService) {}

  ngOnInit(): void {
    this.refetch$.next();
  }

  onCloseForm() {
    this.registrationMode = false;
    this.selectedStudent = null;
  }

  updateStudent(student: IStudent) {
    this.studentsHttpService
      .updateStudent(student)
      .pipe(
        tap(() => {
          this.onCloseForm();
          this.refetch$.next();
        })
      )
      .subscribe();
  }

  registerStudent(student: IStudent) {
    this.studentsHttpService
      .registerStudent(student)
      .pipe(
        tap(() => {
          this.onCloseForm();
          this.refetch$.next();
        })
      )
      .subscribe();
  }

  deleteStudent(id: number) {
    this.studentsHttpService
      .deleteStudent(id)
      .pipe(
        tap(() => {
          this.refetch$.next();
        })
      )
      .subscribe();
  }
}
