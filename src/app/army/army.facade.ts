
import { Injectable } from '@angular/core';
import { ArmyStoreActions, ArmyStoreSelectors } from './army-store/army.index';
import { Store } from '@ngrx/store';


@Injectable({
  providedIn: 'root',
})
export class ArmyFacade {
  constructor(private store: Store) {}

  requestLoadArmy() {
    this.store.dispatch(ArmyStoreActions.requestLoadArmy());
  }

  getArmy() {
    return this.store.select(ArmyStoreSelectors.selectArmyState);
  }
  getArmyUnit(name: string) {
    return this.store.select(ArmyStoreSelectors.selectArmyUnit(name));
  }
}
