import { Store } from '@ngrx/store';

import {
  RoosterStoreActions,
  RoosterStoreSelectors,
} from '../rooster/rooster-store/rooster.index';

import { ElementRef, Injectable } from '@angular/core';

import { Unit } from '../army/interfaces/unit.interface';

import { UnitDirective } from '../rooster/components/features/unit.directive';
import { Player } from '../rooster/interfaces/player.interface';
import { Rooster } from '../rooster/interfaces/rooster.interface';
import { ArmyStoreActions } from '../army/army-store/army.index';

@Injectable({
  providedIn: 'root',
})
export class MainFacade {
  constructor(private store: Store) {}

  gridUnit!: number;
  injectPlace!: UnitDirective;
  battlefieldBoundaries: ElementRef | undefined;
  units: Unit[] = [];
  players: Player[] = [];
  roosters: Rooster[] = [];

  public init() {
    this.store.dispatch(ArmyStoreActions.requestLoadArmy());
  }

  createGridArray = (x: number) => Array.from(Array(x).keys());



  setGridUnit(
    gridUnit: number,
    injectPlace: UnitDirective,
    battlefieldBoundaries: ElementRef | undefined
  ) {
    this.gridUnit = gridUnit;
    this.injectPlace = injectPlace;
    this.battlefieldBoundaries = battlefieldBoundaries;
  }

  getInjectPlace() {
    return this.injectPlace;
  }

  getGridUnit() {
    return this.gridUnit;
  }

  getBattlefieldBoundaries() {
    return this.battlefieldBoundaries;
  }
  updateAllUnitUIData() {
    this.store.dispatch(RoosterStoreActions.updateAllUnitUIData());
  }

  getPlayerScore$(playerIndex: number) {
    return this.store.select(
      RoosterStoreSelectors.selectPlayerScore(playerIndex)
    );
  }

  getPlayers() {
    this.store
      .select(RoosterStoreSelectors.selectPlayers)
      .subscribe((players) => (this.players = players));
  }

  getRoosters(playerIndex: number) {
    this.store
      .select(RoosterStoreSelectors.selectRoosters(playerIndex))
      .subscribe((roosters) => (this.roosters = roosters));
  }
  getUnits(playerIndex: number, roosterIndex: number) {
    this.store
      .select(RoosterStoreSelectors.selectRooster(playerIndex, roosterIndex))
      .subscribe((units) => (this.units = units));
  }

  getMessages() {
    return this.store.select(RoosterStoreSelectors.selectMessages);
  }

  runAllSkirmishes() {
    this.store.dispatch(RoosterStoreActions.runAllSkirmishes());
  }

  resolveHit() {
    this.store.dispatch(RoosterStoreActions.resolveHit());
  }
}
