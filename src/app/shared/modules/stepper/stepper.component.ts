import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IStep } from './models/step.interface';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
  @Input() steps: IStep[] = [];
  @Input() currentStep: number = 0;
  @Output() stepChange = new EventEmitter<IStep>();

  onStepChange(step: IStep) {
    this.stepChange.emit(step);
  }
}
