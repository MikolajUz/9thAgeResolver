import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArmyListStoreModule } from '../army/army-store/army.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RoosterStoreModule } from '../rooster/rooster-store/rooster.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ArmyListStoreModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(),
    RoosterStoreModule,
  ],
})
export class RootStoreModule {}
