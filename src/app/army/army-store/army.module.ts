import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { armyStoreEffects } from './army.effects';
import { armyReducer } from './army.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('armyList', armyReducer),
    EffectsModule.forFeature([armyStoreEffects]),
  ],
  providers: [armyStoreEffects],
})
export class ArmyListStoreModule {}
