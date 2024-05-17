import { unitUI } from '../../rooster/interfaces/unit-ui.interface';
import { UnitRules, adaptOption } from './unitRules.interface';
import { Injectable } from '@angular/core';
import { unitRaw } from './dataUnit.interface';

export interface Unit {
  aeg: string | null;
  agi: number;
  ap: number;
  arm: number;
  att: number;
  base: string;
  def: number;
  dis: number;
  hp: number;
  of: number;
  res: number;
  str: number;
  type: string;
  height: string;
  unit_type: string;
  quantity: number;
  points: number;
  rules: UnitRules[];
  name: string;
  wounds: number;
  ID: number;
  fileLength: number;
  selected: boolean;
  unitUI: unitUI;
  options: string[];
  onBattlefield: boolean;
}

export class Unit {
  constructor(
    public name: string,
    public aeg: string | null,
    public agi: number,
    public ap: number,
    public arm: number,
    public att: number,
    public base: string,
    public def: number,
    public dis: number,
    public hp: number,
    public of: number,
    public res: number,
    public str: number,
    public type: string,
    public height: string,
    public unit_type: string,
    public rules: UnitRules[]
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class UnitAdapter {
  adapt(rawData: unitRaw): Unit {
    return new Unit(
      rawData.name,
      rawData.carac.aeg,
      Number(rawData.carac.agi),
      Number(rawData.carac.ap),
      Number(rawData.carac.arm),
      Number(rawData.carac.att),
      rawData.carac.base,
      Number(rawData.carac.def),
      Number(rawData.carac.dis),
      Number(rawData.carac.hp),
      Number(rawData.carac.of),
      Number(rawData.carac.res),
      Number(rawData.carac.str),
      rawData.carac.type,
      rawData.carac.height,
      rawData.carac.unit_type,
      adaptOption(rawData.model_rule_unit_troops)
    );
  }
}
