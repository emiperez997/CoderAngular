import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsComponent } from './inscriptions.component';
import { TableComponent } from './components/table/table.component';
import { provideState } from '@ngrx/store';
import { inscriptionsFeature } from './store/inscriptions.reducer';
import { provideEffects } from '@ngrx/effects';
import { InscriptionsEffects } from './store/inscriptions.effects';

@NgModule({
  declarations: [InscriptionsComponent],
  imports: [CommonModule, InscriptionsRoutingModule, TableComponent],
  providers: [
    provideState(inscriptionsFeature),
    provideEffects(InscriptionsEffects),
  ],
})
export class InscriptionsModule {}
