import { BattlePlayer } from './battlePlayer.interface';

export interface BattleData {
  battlePlayers: BattlePlayer[];
}

export class BattleData {
  constructor(public battlePlayers: BattlePlayer[]) {}
}
