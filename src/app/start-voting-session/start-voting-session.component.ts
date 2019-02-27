import { Component, OnInit, OnDestroy } from '@angular/core';

import {BackendService} from '../backend.service';
import { tap, filter, map, shareReplay, share, switchMap,  } from 'rxjs/operators';
import { Subscription, merge, fromEvent, combineLatest, of, } from 'rxjs';

class MockBackendService {
  getVotingEvents() {
    // return of([{name: 'The only event'}]);
    return of([
      {name: 'The first event'},
      {name: 'The second event'},
      {name: 'The third event'},
    ]);
  }
}

@Component({
  selector: 'app-start-voting-session',
  templateUrl: './start-voting-session.component.html',
  styleUrls: ['./start-voting-session.component.css'],
  providers: [{provide: BackendService, useClass: MockBackendService}]
})
export class StartVotingSessionComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    private backend: BackendService,
  ) { }

  ngOnInit() {

    const votingEvents$ = this.backend.getVotingEvents()
    .pipe(
      shareReplay(1)
    );

    const justOneEvent$ = votingEvents$
    .pipe(
      filter(events => events.length === 1),
      map(events => events[0]),
      tap(this.buildSelectedEventLabel)
    );

    const moreThanOneEvent$ = votingEvents$
    .pipe(
      filter(events => events.length > 1),
      share(),
      tap(this.buildEventSelect)
    );

    const eventSelectionChanged$ = moreThanOneEvent$
    .pipe(
      switchMap(() => fromEvent(document.getElementById('selectEvent'), 'change')),
      map((event: any) => event.target.value)
    );

    const votingEvent$ = merge(justOneEvent$, eventSelectionChanged$);

    const firstName$ = fromEvent(document.getElementById('firstName'), 'keyup')
    .pipe(
      map((event: any) => event.target.value)
    );
    const lastName$ = fromEvent(document.getElementById('lastName'), 'keyup')
    .pipe(
      map((event: any) => event.target.value)
    );

    const inputData$ = combineLatest(votingEvent$, firstName$, lastName$)
    .pipe(
      tap(([event, firstName, lastName])  => {
        const isValidInput = this.isInputDataValid(event, firstName, lastName);
        const button = document.getElementById('startButton') as HTMLButtonElement;
        button.disabled = !isValidInput;
      })
    );

    const buttonClick$ = fromEvent(document.getElementById('startButton'), 'click');

    // this.subscription = merge(justOneEvent$, moreThanOneEvent$)
    // this.subscription = votingEvent$
    // this.subscription = combineLatest(votingEvent$, firstName$, lastName$)
    this.subscription = combineLatest(buttonClick$, inputData$)
    .subscribe(
      data => {
        console.log(data);
      },
      console.error,
      () => {
        console.log('Done');
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  buildSelectedEventLabel(event: any) {
    const eventLabel = document.getElementById('votingEvent');
    eventLabel.innerHTML = event.name;
  }
  buildEventSelect(votingEvents: any[]) {
    const select: any = document.getElementById('selectEvent');
    votingEvents.map(event => {
      const option = document.createElement('option');
      option.text = event.name;
      select.add(option);
    });
  }
  isInputDataValid(event: any, firstName: string, lastName: string) {
    return event && firstName.trim().length > 0 && lastName.trim().length > 0;
  }

}
