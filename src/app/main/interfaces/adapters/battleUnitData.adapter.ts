import { Injectable } from '@angular/core';
import { BattleUnitData } from '../battleUnitData.interface';
import { skirmishScore } from '../skirmishScore.interface';

@Injectable({
  providedIn: 'root',
})
export class BattleUnitAdapter {
  adapt(
    playerIndex: number,
    gridUnit: number,
    files: number,
    ranks: number,
    startPoint: {
      x: number;
      y: number;
    },
    RFwidth: number,
    width: number,
    RFheight: number,
    height:number,
    RFnumber: number,
    ID: number,
    currentAgi:number,
    RaFRestPlaces: boolean[],
    contactArray:(string | boolean)[][][],
    score: skirmishScore,
    wounds:number,
    quantity:number,
  ): BattleUnitData {
    return new BattleUnitData(
      playerIndex,
      gridUnit,
      files,
      ranks,
      startPoint,
      RFwidth,
      width,
      RFheight,
      height,
      RFnumber,
      ID,
      currentAgi,
      RaFRestPlaces,
      contactArray,
      score,
      wounds,
      quantity
    );
  }
}
