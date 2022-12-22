import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { ChallengeModule } from './pages/challenge/challenge.module';
import { ChallengesModule } from './pages/challenges/challenges.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ChallengeModule,
    ChallengesModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
