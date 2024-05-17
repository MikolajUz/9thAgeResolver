import { createAction, props } from '@ngrx/store';
import { Unit } from '../interfaces/unit.interface';

export const requestLoadArmy = createAction(
  '[armyList Section] Request to Load Army'
);

export const armyLoaded = createAction(
  '[armyList Section API] Army Loaded',
  props<{ units: Unit[] }>()
);

export const armyLoadError = createAction(
  '[armyList Section API] Army Loading Error'
);
