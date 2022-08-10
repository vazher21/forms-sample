import { Injectable } from '@angular/core';
import { BaseStepService } from '../../../../shared/models/base-step-service';
import { IStudentAddressInfo } from '../../../models/user.interface';
import {
  IStudentAddressForm,
  IStudentAddressFullForm,
} from '../../../models/user-form.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, shareReplay, Subject, switchMap, tap } from 'rxjs';
import { AddressTranslateService } from '../../../../shared/services/address-translate.service';
import { areAddressesEqual } from '../../../../shared/helpers/address.helper';

@Injectable()
export class StudentFormAddressService
  implements BaseStepService<IStudentAddressInfo>
{
  private _showActualAddressGroup$ = new BehaviorSubject(true);
  public showActualAddressGroup$ = this._showActualAddressGroup$.pipe(
    shareReplay(1)
  );
  detectChanges$ = new Subject<void>();

  constructor(private addressTranslateService: AddressTranslateService) {
    this.valueChanges();
  }

  fillForm(address: IStudentAddressInfo): void {
    this.legalCountry.setValue(address.legal.country);
    this.legalCountryEng.setValue(address.legal.countryEng);
    this.legalFull.setValue(address.legal.full);
    this.legalFullEng.setValue(address.legal.fullEng);
    this.legalCountry.setValue(address.legal.country);
    this.legalCountry.setValue(address.legal.country);

    this.actualSameAsLegal.setValue(
      areAddressesEqual(address.legal, address.actual)
    );

    if (address.actual) {
      this.actualCountry.setValue(address.actual.country);
      this.actualCountryEng.setValue(address.actual.countryEng);
      this.actualFull.setValue(address.actual.full);
      this.actualFullEng.setValue(address.actual.fullEng);
      this.actualCountry.setValue(address.actual.country);
      this.actualCountry.setValue(address.actual.country);
    }
  }

  markAllAsTouched() {
    this.form.markAllAsTouched();
  }

  form: FormGroup<IStudentAddressFullForm> =
    new FormGroup<IStudentAddressFullForm>({
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

  isValid(): boolean {
    return !this.form.invalid;
  }

  valueChanges() {
    this.actualSameAsLegal.valueChanges
      .pipe(
        tap((checked) => {
          if (checked) {
            this.actualGroup.disable();
            this._showActualAddressGroup$.next(false);
          } else {
            this._showActualAddressGroup$.next(true);
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

  readForm(): IStudentAddressInfo {
    return {
      legal: this.legalGroup.getRawValue(),
      actual: this.actualSameAsLegal.value
        ? this.legalGroup.getRawValue()
        : this.legalGroup.getRawValue(),
    };
  }

  // Address getters
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
