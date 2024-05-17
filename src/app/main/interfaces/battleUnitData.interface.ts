import { skirmishScore } from "./skirmishScore.interface";

export interface BattleUnitData {
  playerIndex: number;
  gridUnit: number;
  files: number;
  ranks: number;
  startPoint: {
    x: number;
    y: number;
  };
  RFwidth: number;
  RFheight: number;
  RFnumber: number;
  ID: number;
  currentAgi:number,
  RaFRestPlaces: boolean[];
  contactArray:(string | boolean)[][][]
  score:skirmishScore,
  wounds:number,
  quantity:number,
}

export class BattleUnitData {
  constructor(
    public playerIndex: number,
    public gridUnit: number,
    public files: number,
    public ranks: number,
    public startPoint: {
      x: number;
      y: number;
    },
    public RFwidth: number,
    public width: number,
    public RFheight: number,
    public height: number,
    public RFnumber: number,
    public ID: number,
    public currentAgi:number,
    public RaFRestPlaces: boolean[],
    public contactArray:(string | boolean)[][][],
    public score:skirmishScore,
    public wounds:number,
    public quantity:number,
  ) {}
}
