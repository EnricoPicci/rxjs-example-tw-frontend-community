import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartVotingSessionComponent } from './start-voting-session.component';

describe('StartVotingSessionComponent', () => {
  let component: StartVotingSessionComponent;
  let fixture: ComponentFixture<StartVotingSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartVotingSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartVotingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
