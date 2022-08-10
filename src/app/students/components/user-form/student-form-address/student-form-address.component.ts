import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  IStudentAddressForm,
  IStudentAddressFullForm,
} from '../../../models/user-form.interface';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { AddressTranslateService } from '../../../../shared/services/address-translate.service';

@Component({
  selector: 'app-student-form-address',
  templateUrl: './student-form-address.component.html',
  styleUrls: ['../../../styles/_form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentFormAddressComponent implements OnInit {
  @Output() formCreated = new EventEmitter<
    FormGroup<IStudentAddressFullForm>
  >();

  form!: FormGroup<IStudentAddressFullForm>;
  showActualAddressGroup$ = new BehaviorSubject(true);
  constructor(private addressTranslateService: AddressTranslateService) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.valueChanges();
    this.formCreated.emit(this.form);
  }

  createForm(): FormGroup<IStudentAddressFullForm> {
    return new FormGroup<IStudentAddressFullForm>({
      actual: new FormGroup<IStudentAddressForm>({
        country: new FormControl<string>('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
        countryEng: new FormControl<string>('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
        full: new FormControl<string>('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
        fullEng: new FormControl<string>('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
      }),
      legal: new FormGroup<IStudentAddressForm>({
        country: new FormControl<string>('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
        countryEng: new FormControl<string>('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
        full: new FormControl<string>('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
        fullEng: new FormControl<string>('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
      }),
      actualSameAsLegal: new FormControl<boolean | null>(null),
    });
  }

  valueChanges() {
    this.actualSameAsLegal.valueChanges
      .pipe(
        tap((checked) => {
          if (checked) {
            this.actualGroup.disable();
            this.showActualAddressGroup$.next(false);
            console.log('hide');
          } else {
            this.showActualAddressGroup$.next(true);
            this.actualGroup.enable();
          }
          this.form!.updateValueAndValidity();
        })
      )
      .subscribe();

    this.legalCountry.valueChanges
      .pipe(
        switchMap((country) =>
          this.addressTranslateService.translateAddress(country)
        ),
        tap((val) => this.legalCountryEng.setValue(val))
      )
      .subscribe();

    this.legalFull.valueChanges
      .pipe(
        switchMap((address) =>
          this.addressTranslateService.translateAddress(address)
        ),
        tap((val) => this.legalFullEng.setValue(val))
      )
      .subscribe();

    this.actualFull.valueChanges
      .pipe(
        switchMap((address) =>
          this.addressTranslateService.translateAddress(address)
        ),
        tap((val) => this.actualFullEng.setValue(val))
      )
      .subscribe();

    this.actualCountry.valueChanges
      .pipe(
        switchMap((country) =>
          this.addressTranslateService.translateAddress(country)
        ),
        tap((val) => this.actualCountryEng.setValue(val))
      )
      .subscribe();
  }
  get legalGroup() {
    return this.form.controls.legal;
  }
  get actualGroup() {
    return this.form.controls.actual;
  }
  get actualSameAsLegal() {
    return this.form.controls.actualSameAsLegal;
  }

  get legalCountry() {
    return this.legalGroup.controls.country;
  }
  get legalCountryEng() {
    return this.legalGroup.controls.countryEng;
  }
  get legalFull() {
    return this.legalGroup.controls.full;
  }
  get legalFullEng() {
    return this.legalGroup.controls.fullEng;
  }

  get actualCountry() {
    return this.actualGroup.controls.country;
  }
  get actualCountryEng() {
    return this.actualGroup.controls.countryEng;
  }
  get actualFull() {
    return this.actualGroup.controls.full;
  }
  get actualFullEng() {
    return this.actualGroup.controls.fullEng;
  }
}
