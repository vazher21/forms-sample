import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

export interface BaseStepService<INPUT, OUTPUT = INPUT> {
  form: FormGroup;
  fillForm: (data: INPUT) => void;
  readForm: () => OUTPUT;
  isValid: () => boolean;
  markAllAsTouched: () => void;
  detectChanges$: Subject<void>;
}
