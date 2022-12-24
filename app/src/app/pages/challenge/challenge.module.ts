import { NgModule } from '@angular/core';

import { ChallengeComponent } from './challenge.component';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';

import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [ChallengeComponent],
  imports: [
    BrowserAnimationsModule,
    ButtonModule,
    ConfirmPopupModule,
    FormsModule,
    MenuModule,
    TableModule,
    TabViewModule,
    RadioButtonModule,
  ],
  exports: [ChallengeComponent],
  providers: [ConfirmationService],
})
export class ChallengeModule {}
