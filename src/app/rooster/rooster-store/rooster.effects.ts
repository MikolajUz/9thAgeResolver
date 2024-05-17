import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoosterStoreActions, RoosterStoreSelectors } from './rooster.index';
import { RoosterService } from '../services/rooster.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { VisualsService } from '../services/visuals.service';

import { of } from 'rxjs';
import { BattleService } from '../../main/services/battle.service';

@Injectable()
export class RoosterStoreEffects {
  constructor(
    private roosterService: RoosterService,
    private visualsService: VisualsService,
    private battleService: BattleService,
    private action$: Actions
  ) {}

  loadRooster$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.requestRoosterLoad),
        tap((roosterName) =>
          this.roosterService.readRooster(
            roosterName.roosterTxT,
            roosterName.playerIndex,
            roosterName.roosterIndex
          )
        )
      ),
    { dispatch: false }
  );

  createUnitUI$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.createUnitUI),
        tap((unitData) =>
          this.visualsService.createUnitUI(
            unitData.playerIndex,
            unitData.unitID
          )
        )
      ),
    { dispatch: false }
  );

  increaseQuantity$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.increaseQuantity),
        tap((unit) =>
          this.visualsService.createUnitData(unit.playerIndex, unit.unitID)
        )
      ),
    { dispatch: false }
  );

  decreaseQuantity$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.decreaseQuantity),
        tap((unit) =>
          this.visualsService.createUnitData(unit.playerIndex, unit.unitID)
        )
      ),
    { dispatch: false }
  );

  setFileLength$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.setFileLength),
        tap((unit) =>
          this.visualsService.createUnitData(unit.playerIndex, unit.unitID)
        )
      ),
    { dispatch: false }
  );

  deleteUnit$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.deleteUnit),
        tap((unit) =>
          this.visualsService.deleteUnit(unit.unitID, unit.playerIndex)
        )
      ),
    { dispatch: false }
  );

  updateAllUnitUIData$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.updateAllUnitUIData),
        tap(() => this.visualsService.updateAllUnitUIData())
      ),
    { dispatch: false }
  );

  resolveSkirmish$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.runAllSkirmishes),
        tap(() => this.battleService.runAllSkirmishes())
      ),
    { dispatch: false }
  );
  resolveHit$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.resolveHit),
        tap(() => this.battleService.resolveHit())
      ),
    { dispatch: false }
  );
}
