import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ArmyListComponent } from './army/components/containers/armyList/armyList.component';
import { UnitComponent } from './army/components/features/unit/unit.component';
import { MaterialModule } from '../UI/material.module';
import { RootStoreModule } from './root-store/root-store.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RoosterLoaderComponent } from './rooster/components/features/rooster-loader/rooster-loader.component';
import { MainPageComponent } from './main/components/containers/main-page/main-page.component';
import { BattlefieldComponent } from './main/components/features/battlefield/battlefield.component';
import { UnitVisualComponent } from './rooster/components/features/unit-visual/unit-visual.component';
import { UnitDirective } from './rooster/components/features/unit.directive';
import { TableRoosterComponent } from './rooster/components/features/table-rooster/table-rooster.component';
import { BattleComponent } from './main/components/features/battle/battle.component';
import { ResultsComponent } from './main/components/features/results-main/results/results.component';
import { ResultTableComponent } from './main/components/features/results-main/result-table/result-table.component';
import { ModelVisualComponent } from './rooster/components/features/unit-visual/model-visual/model-visual.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    ArmyListComponent,
    UnitComponent,
    RoosterLoaderComponent,
    MainPageComponent,
    BattlefieldComponent,
    UnitVisualComponent,
    UnitDirective,
    TableRoosterComponent,
    BattleComponent,
    ResultsComponent,
    ResultTableComponent,
    ModelVisualComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    RootStoreModule,

    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
