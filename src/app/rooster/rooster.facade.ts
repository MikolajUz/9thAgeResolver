import { ElementRef, Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { unitUI } from './interfaces/unit-ui.interface';
import { Unit } from '../army/interfaces/unit.interface';
import { UnitDirective } from './components/features/unit.directive';
import { Player } from './interfaces/player.interface';
import { Rooster } from './interfaces/rooster.interface';
import { skirmishScore } from '../main/interfaces/skirmishScore.interface';
import {
  RoosterStoreActions,
  RoosterStoreSelectors,
} from './rooster-store/rooster.index';
import { messages } from './interfaces/messages.interface';

@Injectable({
  providedIn: 'root',
})
export class RoosterFacade {
  constructor(private store: Store) {}



  getUnitUIdata(playerIndex: number, roosterIndex: number, ID: number) {
    return this.store.select(
      RoosterStoreSelectors.selectUnitUIData(playerIndex, roosterIndex, ID)
    );
  }

  requestRoosterLoad(
    roosterTxT: string,
    playerIndex: number,
    roosterIndex: number
  ) {
    this.store.dispatch(
      RoosterStoreActions.requestRoosterLoad({
        roosterTxT: roosterTxT,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
      })
    );
  }

  updateAllUnitUIData() {
    this.store.dispatch(RoosterStoreActions.updateAllUnitUIData());
  }

  updateScore(
    playerIndex: number,
    unitIndex: number,
    propertyName: keyof skirmishScore,
    changeValue: any
  ) {
    this.store.dispatch(
      RoosterStoreActions.updateScore({
        playerIndex: playerIndex,
        unitIndex: unitIndex,
        propertyName: propertyName,
        changeValue: changeValue,
      })
    );
  }
  scoreInit(playerIndex: number, unitIndex: number, name: string) {
    this.store.dispatch(
      RoosterStoreActions.scoreInit({
        playerIndex: playerIndex,
        unitIndex: unitIndex,
        name: name,
      })
    );
  }
  clearScore() {
    this.store.dispatch(RoosterStoreActions.clearScore());
  }

  addUnitToRooster(unit: Unit, playerIndex: number, roosterIndex: number) {
    this.store.dispatch(
      RoosterStoreActions.addUnitToRooster({
        nextUnit: unit,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
      })
    );
  }
  getRoosterUnitByID$(playerIndex: number, roosterIndex: number, ID: number) {
    return this.store.select(
      RoosterStoreSelectors.selectUnitByID(playerIndex, roosterIndex, ID)
    );
  }
 
  createGridArray = (x: number) => Array.from(Array(x).keys());







  updateMessages(message: string, messageName: keyof messages) {
    this.store.dispatch(
      RoosterStoreActions.updateMessages({
        message: message,
        messageName: messageName,
      })
    );
  }

  getBattleUnits(playerIndex: number) {
    let battleUnits: Unit[] = [];
    this.store
      .select(RoosterStoreSelectors.selectBattleUnits(playerIndex))
      .subscribe((unit) => (battleUnits = unit));

    return battleUnits;
  }

  getRoosterUnitByID(playerIndex: number, roosterIndex: number, ID: number) {
    let unitReturn!: Unit;
    let temp;
    let select = this.store.select(
      RoosterStoreSelectors.selectUnitByID(playerIndex, roosterIndex, ID)
    );

    select.subscribe((unit) => (temp = unit));

    if (temp) unitReturn = temp;
    return unitReturn;
  }

  changeUnitUIData(
    unitUI: unitUI,
    unitID: number,
    playerIndex: number,
    roosterIndex: number
  ) {
    this.store.dispatch(
      RoosterStoreActions.updateUnitUIData({
        unitUI: unitUI,
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
      })
    );
  }

  getPropertyOfRoosterUnit(
    playerIndex: number,
    roosterIndex: number,
    ID: number,
    propertyName: keyof Unit
  ) {
    let propertyReturn;
    this.store
      .select(
        RoosterStoreSelectors.selectUnitPropertyByID(
          playerIndex,
          roosterIndex,
          ID,
          propertyName
        )
      )
      .subscribe((property) => (propertyReturn = property));
    return propertyReturn;
  }

  getRooster(playerIndex: number, roosterIndex: number) {
    return this.store.select(
      RoosterStoreSelectors.selectRooster(playerIndex, roosterIndex)
    );
  }
  setFileLength(
    unitID: number,
    fileLength: number,
    playerIndex: number,
    roosterIndex: number
  ) {
    this.store.dispatch(
      RoosterStoreActions.setFileLength({
        unitID: unitID,
        fileLength: fileLength,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
      })
    );
  }

  changeOnBattlefieldProperty(
    unitID: number,
    playerIndex: number,
    roosterIndex: number
  ) {
    this.store.dispatch(
      RoosterStoreActions.changeOnBattlefieldProperty({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
      })
    );
  }

  pickUnit(unitID: number, playerIndex: number, roosterIndex: number) {
    this.store.dispatch(
      RoosterStoreActions.createUnitUI({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
      })
    );
  }

  selectUnit(unitID: number, playerIndex: number, roosterIndex: number) {
    this.store.dispatch(
      RoosterStoreActions.selectUnit({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
      })
    );
  }

  decreaseQuantity(
    unitID: number,
    playerIndex: number,
    roosterIndex: number,
    amount: number
  ) {
    this.store.dispatch(
      RoosterStoreActions.decreaseQuantity({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
        amount: amount,
      })
    );
  }

  increaseQuantity(
    unitID: number,
    playerIndex: number,
    roosterIndex: number,
    amount: number
  ) {
    this.store.dispatch(
      RoosterStoreActions.increaseQuantity({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
        amount: amount,
      })
    );
  }
  addWound(
    unitID: number,
    playerIndex: number,
    roosterIndex: number,
    amount: number
  ) {
    this.store.dispatch(
      RoosterStoreActions.addWound({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
        amount: amount,
      })
    );
  }
  removeWound(
    unitID: number,
    playerIndex: number,
    roosterIndex: number,
    amount: number
  ) {
    this.store.dispatch(
      RoosterStoreActions.removeWound({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
        amount: amount,
      })
    );
  }
  setWounds(
    unitID: number,
    playerIndex: number,
    roosterIndex: number,
    wounds: number
  ) {
    this.store.dispatch(
      RoosterStoreActions.setWounds({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
        wounds: wounds,
      })
    );
  }

  deleteUnit(unitID: number, playerIndex: number, roosterIndex: number) {
    this.store.dispatch(
      RoosterStoreActions.deleteUnit({
        unitID: unitID,
        playerIndex: playerIndex,
        roosterIndex: roosterIndex,
      })
    );
  }

  scoreSum() {
    this.store.dispatch(RoosterStoreActions.scoreSum());
  }

  getRanks() {
    this.store.dispatch(RoosterStoreActions.getRanks());
  }

  combatResult() {
    this.store.dispatch(RoosterStoreActions.combatResult());
  }
}
