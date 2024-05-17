import { map, of, catchError, exhaustMap } from 'rxjs';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ArmyService } from '../services/army.service';
import * as armyActions from './army.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class armyStoreEffects {
  constructor(private armyService: ArmyService, private action$: Actions) {}

  loadArmy$ = createEffect(() => {
    return this.action$.pipe(
      ofType(armyActions.requestLoadArmy),

      exhaustMap(() =>
        this.armyService.getArmy().pipe(
          map((units) => armyActions.armyLoaded({ units })),
          catchError(() =>
            of({ type: '[armyList Section API] Army Loading Error' })
          )
        )
      )
    );
  });
}
