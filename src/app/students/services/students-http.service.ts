import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStudent } from '../models/user.interface';
import { delay, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsHttpService {
  readonly baseUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getStudents(): Observable<IStudent[]> {
    return this.http
      .get<IStudent[]>(this.baseUrl + 'students')
      .pipe(delay(200));
  }

  getStudent(id: number): Observable<IStudent> {
    return this.http
      .get<IStudent>(this.baseUrl + `students/${id}`)
      .pipe(delay(200));
  }

  updateStudent(updatedStudent: IStudent): Observable<IStudent> {
    return this.http
      .put<IStudent>(
        this.baseUrl + `students/${updatedStudent.id}`,
        updatedStudent
      )
      .pipe(delay(200));
  }

  registerStudent(student: IStudent): Observable<IStudent> {
    return this.http
      .post<IStudent>(this.baseUrl + 'students', student)
      .pipe(delay(200));
  }

  deleteStudent(id: number): Observable<boolean> {
    return this.http
      .delete(this.baseUrl + `students/${id}`)
      .pipe(delay(200))
      .pipe(map((o) => !!o));
  }
}
