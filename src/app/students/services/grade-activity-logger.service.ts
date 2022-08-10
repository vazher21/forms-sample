import { Injectable } from '@angular/core';
import { IStudentGradesInfo } from '../models/user.interface';
import { delay, of } from 'rxjs';
import { Nullable } from '../../shared/models/nullable.type';

@Injectable({
  providedIn: 'root',
})
export class GradeActivityLoggerService {
  logChange(state: Nullable<IStudentGradesInfo>, date: Date) {
    return of('imagine i am logging this to my db').pipe(delay(80));
  }
}
