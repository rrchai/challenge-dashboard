
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChallengesComponent } from './pages/challenges/challenges.component';
import { ChallengeComponent } from './pages/challenge/challenge.component';


const routes: Routes = [
  { path: 'challenges', component: ChallengesComponent },
  { path: 'c/:id', component: ChallengeComponent },
  { path: '',  redirectTo: '/challenges', pathMatch: 'full' },
  { path: '**', redirectTo: '/challenges', pathMatch: 'full'}, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }