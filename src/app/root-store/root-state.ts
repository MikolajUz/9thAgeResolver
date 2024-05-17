import { ArmyStoreState } from '../army/army-store/army.index';
import { PlayersState } from '../rooster/rooster-store/rooster.state';

export interface RootState {
  units: ArmyStoreState.ArmyState;
  players: PlayersState;
}
