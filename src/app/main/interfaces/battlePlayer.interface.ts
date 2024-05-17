import { BattleUnitData } from './battleUnitData.interface';

export interface BattlePlayer {
  battlePlayer: BattleUnitData[];
}

export class BattlePlayer {
  constructor(public battlePlayer: BattleUnitData[]) {}
}
