import { StudentAvailabilityService } from '../services/student-availability.service';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable, of } from 'rxjs';

export function existingPinValidator(
  studentAvailabilityService: StudentAvailabilityService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return control.value
      ? studentAvailabilityService
          .isPersonalNumberAvailable(control.value)
          .pipe(
            map((val) =>
              !val ? { pinExists: 'this pin is already taken' } : null
            )
          )
      : of(null);
  };
}
