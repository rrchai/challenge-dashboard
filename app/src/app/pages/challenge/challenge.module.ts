import { NgModule } from '@angular/core';
import { ChallengeComponent } from './challenge.component';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';

import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [ChallengeComponent],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    TabViewModule,
    RadioButtonModule,
  ],
  exports: [ChallengeComponent],
})
export class ChallengeModule {}
