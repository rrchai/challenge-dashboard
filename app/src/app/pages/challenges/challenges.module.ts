// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ChallengesComponent } from './challenges.component';
// import { ButtonModule } from 'primeng/button';
// import { CardModule, } from 'primeng/card';

// @NgModule({
//   declarations: [ChallengesComponent],
//   imports: [
//     ButtonModule,
//     CommonModule,
//     CardModule
//   ],
//   exports: [ChallengesComponent]
// })

import { NgModule } from '@angular/core';

import { ChallengesComponent } from './challenges.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ChallengesComponent],
  imports: [
    ButtonModule,
    // BrowserAnimationsModule,
    DataViewModule,
    // FormsModule
  ],
  exports: [ChallengesComponent],
})
export class ChallengesModule {}
