import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {StartVotingSessionComponent} from './start-voting-session/start-voting-session.component';

const routes: Routes = [
  {
    path: 'vote',
    component: StartVotingSessionComponent,
    data: { title: 'start voting session' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
