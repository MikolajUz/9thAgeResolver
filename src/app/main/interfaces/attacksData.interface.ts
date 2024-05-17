export interface attacksData {
  attackedUnitID: string;
  attacksNmb: number;
  hitRolls: number[];
  toHit: number;
  hits: number;
  woundRolls: number[];
  toWound: number;
  wounds: number;
  armourRolls: number[];
  toArmour: number;
  armourSaved: number;
  specialRolls: number[];
  toSpecial: number;
  specialSaved: number;
  finalWounds: number;
}

export class attacksData {
  constructor(
    public attackedUnitID: string,
    public attacksNmb: number,
    public hitRolls: number[],
    public toHit: number,
    public hits: number,
    public woundRolls: number[],
    public toWound: number,
    public wounds: number,
    public armourRolls: number[],
    public toArmour: number,
    public armourSaved: number,
    public specialRolls: number[],
    public toSpecial: number,
    public specialSaved: number,
    public finalWounds: number
  ) {}
}

