import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { marbles } from 'rxjs-marbles/jasmine';

import { StartVotingSessionComponent } from './start-voting-session.component';
import { of } from 'rxjs';
import { BackendService } from '../backend.service';

describe('Marble test for case of More Than One Event', () => {

  const firstEvent = {name: 'The first event'};
  const secondEvent = {name: 'The second event'};
  class MockBackendService {
    getVotingEvents() {
      // return of([{name: 'The only event'}]);
      return of([
        firstEvent,
        secondEvent,
      ]);
    }
  }

  let component: StartVotingSessionComponent;
  let fixture: ComponentFixture<StartVotingSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartVotingSessionComponent ],
      providers: [{provide: BackendService, useClass: MockBackendService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartVotingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('5.1 - test the goToVote$ Observable pipe when MORE than one open event is notified', marbles(m => {
    const theFirstName = 'first';
    const theLastName = 'LAST';

    const eventSelectionChanged = {
      e: secondEvent,
    };
    const firstName = {
      a: theFirstName.substr(0, 1),
      b: theFirstName.substr(0, 2),
      c: theFirstName.substr(0, 3),
      d: theFirstName.substr(0, 4),
      e: theFirstName.substr(0, 5),
    };
    const lastName = {
      x: theLastName.substr(0, 1),
      y: theLastName.substr(0, 2),
      w: theLastName.substr(0, 3),
      z: theLastName.substr(0, 4),
    };
    const startButtonClick = {
      c: {},
    };
    const output = {
      o: [{}, [secondEvent, theFirstName, theLastName]] as any,
    };

    const eventSelectionChanged$ = m.hot(   '^e-------------------------', eventSelectionChanged);
    const firstName$ = m.hot(               '^--a-b-c-d--e--------------', firstName);
    const lastName$ = m.hot(                '^---------------x-y-z------', lastName);
    const startButtonClick$ = m.hot(        '^-----------------------c--', startButtonClick);
    const expected = m.cold(                '------------------------o--', output);

    const destination = component.goToNext$(eventSelectionChanged$, firstName$, lastName$, startButtonClick$);

    m.expect(destination).toBeObservable(expected);

  }));
});
