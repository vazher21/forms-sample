import { Subject } from 'rxjs';
import { Directive, OnDestroy } from '@angular/core';

@Directive({})
export abstract class SubscriptionKiller implements OnDestroy {
  subscriptionKiller$ = new Subject<void>();

  ngOnDestroy() {
    this.subscriptionKiller$.next();
    this.subscriptionKiller$.complete();
  }
}
