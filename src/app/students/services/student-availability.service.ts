import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentAvailabilityService {
  constructor() {}

  public isPersonalNumberAvailable(pin: string) {
    return of(Math.random() < 0.9).pipe(delay(200));
  }
}
