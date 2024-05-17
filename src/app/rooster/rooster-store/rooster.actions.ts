import { createAction, props } from '@ngrx/store';
import { unitUI } from '../interfaces/unit-ui.interface';
import { Unit } from '../../army/interfaces/unit.interface';
import { skirmishScore } from '../../main/interfaces/skirmishScore.interface';
import { attacksData } from '../../main/interfaces/attacksData.interface';
import { Observable } from 'rxjs/internal/Observable';
import { messages } from '../interfaces/messages.interface';
import { createUrlTreeFromSnapshot } from '@angular/router';

export const requestRoosterLoad = createAction(
  '[Rooster Section] request to load Rooster',
  props<{ roosterTxT: string; playerIndex: number; roosterIndex: number }>()
);

export const addUnitToRooster = createAction(
  '[Rooster Section] request to add unit to rooster',
  props<{
    nextUnit: Unit;
    playerIndex: number;
    roosterIndex: number;
  }>()
);

export const increaseQuantity = createAction(
  '[Rooster Section] increase quantity of unit',
  props<{
    unitID: number;
    playerIndex: number;
    roosterIndex: number;
    amount: number;
  }>()
);

export const decreaseQuantity = createAction(
  '[Rooster Section] decrease quantity of unit',
  props<{
    unitID: number;
    playerIndex: number;
    roosterIndex: number;
    amount: number;
  }>()
);

export const addWound = createAction(
  '[Rooster Section] add wound to unit',
  props<{
    unitID: number;
    playerIndex: number;
    roosterIndex: number;
    amount: number;
  }>()
);

export const removeWound = createAction(
  '[Rooster Section] remove wound from unit',
  props<{
    unitID: number;
    playerIndex: number;
    roosterIndex: number;
    amount: number;
  }>()
);

export const setWounds = createAction(
  '[Rooster Section] set wounds number',
  props<{
    unitID: number;
    playerIndex: number;
    roosterIndex: number;
    wounds: number;
  }>()
);

export const deleteUnit = createAction(
  '[Rooster Section] delete unit from store',
  props<{ unitID: number; playerIndex: number; roosterIndex: number }>()
);

export const setFileLength = createAction(
  '[Rooster Section] set unit file length ',
  props<{
    unitID: number;
    fileLength: number;
    playerIndex: number;
    roosterIndex: number;
  }>()
);

export const createUnitUI = createAction(
  '[Rooster Section] create unit on battlefield',

  props<{
    unitID: number;
    playerIndex: number;
    roosterIndex: number;
  }>()
);

export const updateUnitUIData = createAction(
  '[Rooster Section] update unit visual data',

  props<{
    unitUI: unitUI;
    unitID: number;
    playerIndex: number;
    roosterIndex: number;
  }>()
);

export const selectUnit = createAction(
  '[Rooster Section] change selected property of unit',
  props<{ unitID: number; playerIndex: number; roosterIndex: number }>()
);

export const updateAllUnitUIData = createAction(
  '[Rooster Section] update all unit visual data (after resize)'
);
export const changeOnBattlefieldProperty = createAction(
  '[Rooster Section] change unit onBattlefield property',
  props<{ unitID: number; playerIndex: number; roosterIndex: number }>()
);

export const runAllSkirmishes = createAction(
  '[Battle Section] request to resolve skirmish'
);

export const resolveHit = createAction(
  '[Battle Section] request to resolve hit at next agility step'
);

export const updateScore = createAction(
  '[Score Section] updates property of score',
  props<{
    playerIndex: number;
    unitIndex: number;
    propertyName: keyof skirmishScore;
    changeValue: string | number | attacksData[];
  }>()
);

export const getRanks = createAction('[Score Section] calculates rank bonus');

export const scoreInit = createAction(
  '[Score Section] inits scores',
  props<{ playerIndex: number; unitIndex: number; name: string }>()
);

export const clearScore = createAction('[Score Section] clears score');

export const scoreSum = createAction(
  '[Score Section] creates sum of unit points'
);

export const updateMessages = createAction(
  '[Score Section] updates messages',
  props<{message:string; messageName: keyof messages}>()
);

export const combatResult = createAction(
  '[Score Section] creates sum of unit points'
)
