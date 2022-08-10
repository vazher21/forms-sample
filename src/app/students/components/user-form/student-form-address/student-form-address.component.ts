import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { BaseStepComponent } from '../../../../shared/models/base-step-component';
import { StudentFormAddressService } from './student-form-address.service';

@Component({
  selector: 'app-student-form-address',
  templateUrl: './student-form-address.component.html',
  styleUrls: ['../../../styles/_form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentFormAddressComponent extends BaseStepComponent {
  form = this.studentFormAddressService.form;
  showActualAddressGroup$ =
    this.studentFormAddressService.showActualAddressGroup$;

  constructor(
    private studentFormAddressService: StudentFormAddressService,
    private cdr: ChangeDetectorRef
  ) {
    super(studentFormAddressService, cdr);
  }

  get legalGroup() {
    return this.studentFormAddressService.legalGroup;
  }
  get actualGroup() {
    return this.studentFormAddressService.actualGroup;
  }
  get actualSameAsLegal() {
    return this.studentFormAddressService.actualSameAsLegal;
  }

  get legalCountry() {
    return this.studentFormAddressService.legalCountry;
  }
  get legalCountryEng() {
    return this.studentFormAddressService.legalCountryEng;
  }
  get legalFull() {
    return this.studentFormAddressService.legalFull;
  }
  get legalFullEng() {
    return this.studentFormAddressService.legalFullEng;
  }

  get actualCountry() {
    return this.studentFormAddressService.actualCountry;
  }
  get actualCountryEng() {
    return this.studentFormAddressService.actualCountryEng;
  }
  get actualFull() {
    return this.studentFormAddressService.actualFull;
  }
  get actualFullEng() {
    return this.studentFormAddressService.actualCountryEng;
  }
}
