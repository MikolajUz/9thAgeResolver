import { Unit } from '../interfaces/unit.interface';

export interface ArmyState {
  units: Unit[];
}

export const initialArmyState: ArmyState = {
  units: [],
};
