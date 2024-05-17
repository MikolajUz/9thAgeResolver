import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  RoosterFeatureKey,
  RoosterReducer,
} from './rooster.reducer';
import { RoosterStoreEffects } from './rooster.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(RoosterFeatureKey, RoosterReducer),
    EffectsModule.forFeature([RoosterStoreEffects]),
  ],
  providers: [RoosterStoreEffects],
})
export class RoosterStoreModule {}
