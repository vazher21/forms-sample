import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import {
  IStudentAddressForm,
  IStudentAddressFullForm,
} from '../../../models/user-form.interface';

@Component({
  selector: 'app-student-form-address',
  templateUrl: './student-form-address.component.html',
  styleUrls: ['../../../styles/_form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentFormAddressComponent implements OnInit {
  form!: FormGroup<IStudentAddressFullForm>;
  @Input() showActualGroup: boolean = false;
  constructor(private cc: ControlContainer) {}

  ngOnInit(): void {
    this.form = this.cc.control as FormGroup;
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
