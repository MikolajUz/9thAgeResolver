import { attacksData } from './attacksData.interface';

// export interface skirmishScore {
//   name:string,
//   sum:number,
//   playerIndex: number;
//   unitIndex: number;
//   woundsDealt: number;
//   woundsSuffered:number,
//   challengeOverkill: number;
//   charge: number;
//   rankBonus: number;
//   standard: number;
//   positionBonus: number;
//   otherBonus: number;
//   attacks: attacksData[];
//   breakTest: number;
//   rerollBreakTest: number;
//   restrainTest: number;
//   rerollRestrainTest: number;
//   FleeOrPursuit: number;
// }

export class skirmishScore {
  constructor(
    public name:string,
    public sum:number=0,
    public playerIndex: number,
    public unitIndex: number,
    public woundsDealt: number,
    public woundsSuffered: number,
    public challengeOverkill: number,
    public charge: number,
    public rankBonus: number,
    public standard: number,
    public positionBonus: number,
    public otherBonus:number,
    public attacks: attacksData[],
    public breakTest: number,
    public rerollBreakTest: number,
    public restrainTest: number,
    public rerollRestrainTest: number,
    public FleeOrPursuit: number
  ) {}
}
