import { messages } from '../interfaces/messages.interface';
import { Player } from '../interfaces/player.interface';

export interface PlayersState {
  players: Player[];
  messages: messages;
}

export const initialPlayersState: PlayersState = {
  players: [
    {
      rooster: [{ units: [] }],
      score: [],
    },
    {
      rooster: [{ units: [] }],
      score: [],
    },
  ],
  messages: { prompt: '', combatEnd: '' },
};
