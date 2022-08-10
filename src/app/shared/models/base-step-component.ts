import { BaseStepService } from './base-step-service';
import { ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs';
import { SubscriptionKiller } from '../classes/subscription-killer';

export abstract class BaseStepComponent extends SubscriptionKiller {
  protected constructor(
    private service: BaseStepService<any>,
    private detectorRef: ChangeDetectorRef
  ) {
    super();
    this.service.detectChanges$
      .pipe(takeUntil(this.subscriptionKiller$))
      .subscribe((_) => this.detectorRef.detectChanges());
  }
}
