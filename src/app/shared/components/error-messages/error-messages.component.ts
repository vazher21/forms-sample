import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Input,
  OnInit,
  Optional,
  SkipSelf,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { FORM_ERRORS } from '../../constants/form-errors';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss'],
})
export class ErrorMessagesComponent implements OnInit {
  @Input() control: FormControl = new FormControl<any>('asd');

  errorMessages = FORM_ERRORS;
  //
  ngOnInit(): void {}

  //
  getFirstErrorsName(): ErrorForTemplate | void {
    if (this.control) {
      return {
        errorName: Object.keys(this.control.errors!)[0],
        errorMessage: Object.values(this.control.errors!)[0],
      };
    }
  }
}

interface ErrorForTemplate {
  errorName: string;
  errorMessage: string;
}
