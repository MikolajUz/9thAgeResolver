import { Characteristics } from './characteristics.interface';
import { UnitRules } from './unitRules.interface';

export interface unitRaw {
  is_mount: boolean;
  carac: Characteristics;
  name: string;
  model_rule_unit_troops: UnitRules[];
}

export interface dataUnit {
  units: unitRaw[];
}
