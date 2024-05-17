import { createReducer, on } from '@ngrx/store';
import { RoosterStoreActions } from './rooster.index';
import { initialPlayersState } from './rooster.state';
import { immerOn } from 'ngrx-immer/store';
import { UnitRules } from '../../army/interfaces/unitRules.interface';
import { skirmishScore } from '../../main/interfaces/skirmishScore.interface';
import { Action } from 'rxjs/internal/scheduler/Action';

export const RoosterFeatureKey = 'currentRooster';

const getWinner = (playerScoreSum: number[]) => {
  let winnerMess: string = '';
  playerScoreSum[0] > playerScoreSum[1]
    ? (winnerMess = `Combat finished. Combat result is ${playerScoreSum[0]} to ${playerScoreSum[1]} for Player One.`)
    : null;
  playerScoreSum[0] < playerScoreSum[1]
    ? (winnerMess = `Combat finished. Combat result is ${playerScoreSum[1]} to ${playerScoreSum[0]} for Player Two.`)
    : null;
  playerScoreSum[0] === playerScoreSum[1]
    ? (winnerMess = `Combat finished. Combat result is tie`)
    : null;
  return winnerMess;
};

export const RoosterReducer = createReducer(
  initialPlayersState,

  on(RoosterStoreActions.requestRoosterLoad, (state, action) => {
    return {
      ...state,
    };
  }),

  immerOn(RoosterStoreActions.addUnitToRooster, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.push(
      action.nextUnit
    );
  }),

  immerOn(RoosterStoreActions.addWound, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) =>
        unit.ID === action.unitID
          ? (unit.wounds = unit.wounds + action.amount)
          : unit
    );
  }),
  immerOn(RoosterStoreActions.removeWound, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => {
        if (unit.ID === action.unitID) {
          if (unit.wounds > 0) unit.wounds = unit.wounds - action.amount;
        }
      }
    );
  }),
  immerOn(RoosterStoreActions.setWounds, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => {
        if (unit.ID === action.unitID) {
          unit.wounds = action.wounds;
        }
      }
    );
  }),
  immerOn(RoosterStoreActions.increaseQuantity, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => {
        if (unit.ID === action.unitID) {
          unit.quantity = unit.quantity + action.amount;
        }
      }
    );
  }),

  immerOn(RoosterStoreActions.decreaseQuantity, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => {
        if (unit.ID === action.unitID) {
          unit.quantity = unit.quantity - action.amount;
        }
      }
    );
  }),
  immerOn(RoosterStoreActions.deleteUnit, (state, action) => {
    state.players[action.playerIndex].rooster[
      action.roosterIndex
    ].units.forEach((unit, index) => {
      if (unit.ID === action.unitID)
        state.players[action.playerIndex].rooster[
          action.roosterIndex
        ].units.splice(index, 1);
    });
  }),

  immerOn(RoosterStoreActions.setFileLength, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => {
        if (unit.ID === action.unitID) {
          unit.fileLength = action.fileLength;
        }
      }
    );
  }),

  on(RoosterStoreActions.createUnitUI, (state, action) => {
    return {
      ...state,
    };
  }),

  immerOn(RoosterStoreActions.updateUnitUIData, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => {
        if (unit.ID === action.unitID) {
          unit.unitUI = action.unitUI;
        }
      }
    );
  }),

  immerOn(RoosterStoreActions.selectUnit, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) =>
        unit.ID === action.unitID ? (unit.selected = !unit.selected) : null
    );
  }),
  on(RoosterStoreActions.updateAllUnitUIData, (state, action) => {
    return {
      ...state,
    };
  }),
  on(RoosterStoreActions.runAllSkirmishes, (state, action) => {
    return {
      ...state,
    };
  }),
  immerOn(RoosterStoreActions.changeOnBattlefieldProperty, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) =>
        unit.ID === action.unitID
          ? (unit.onBattlefield = !unit.onBattlefield)
          : null
    );
  }),
  immerOn(RoosterStoreActions.updateScore, (state, action) => {
    state.players[action.playerIndex].score = state.players[
      action.playerIndex
    ].score.map((unit) => {
      return unit.unitIndex === action.unitIndex
        ? { ...unit, [action.propertyName]: action.changeValue }
        : unit;
    });
  }),

  immerOn(RoosterStoreActions.scoreInit, (state, action) => {
    state.players[action.playerIndex].score.push(
      new skirmishScore(
        action.name,
        0,
        action.playerIndex,
        action.unitIndex,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        [],
        0,
        0,
        0,
        0,
        0
      )
    );
  }),
  immerOn(RoosterStoreActions.clearScore, (state) => {
    state.players.forEach((player) => {
      player.score = [];
    });
  }),
  immerOn(RoosterStoreActions.scoreSum, (state, action) => {
    state.players.forEach((player) => {
      player.score[player.score.length - 1].woundsDealt = 0;
      player.score[player.score.length - 1].standard = 0;
      player.score[player.score.length - 1].rankBonus = 0;
      player.score[player.score.length - 1].positionBonus = 0;
      player.score[player.score.length - 1].otherBonus = 0;
      player.score[player.score.length - 1].charge = 0;

      player.score[player.score.length - 1].woundsDealt = player.score.reduce(
        (acc, num) => acc + num.woundsDealt,
        0
      );
      player.score[player.score.length - 1].standard = player.score.reduce(
        (acc, num) => acc + num.standard,
        0
      );
      player.score[player.score.length - 1].rankBonus = player.score.reduce(
        (acc, num) => acc + num.rankBonus,
        0
      );
      player.score[player.score.length - 1].positionBonus = player.score.reduce(
        (acc, num) => acc + num.positionBonus,
        0
      );
      player.score[player.score.length - 1].otherBonus = player.score.reduce(
        (acc, num) => acc + num.otherBonus,
        0
      );
      player.score[player.score.length - 1].charge = player.score.reduce(
        (acc, num) => (num.charge === 1 ? (acc = 1) : (acc = acc)),
        0
      );
    });
  }),
  immerOn(RoosterStoreActions.clearScore, (state) => {
    state.players.forEach((player) => {
      player.score = [];
    });
  }),
  immerOn(RoosterStoreActions.getRanks, (state) => {
    state.players.forEach((player) => {
      player.score.forEach((unitScore) => {
        let unit = player.rooster[0].units.find(
          (unitRoost) => unitRoost.ID === unitScore.unitIndex
        );
        if (unit) {
          let rankSize = 5;
          if (unit.height === 'Large') rankSize = 3;

          if (unit.fileLength < 8 && unit.fileLength >= rankSize) {
            let rankBonus = Math.trunc(
              (unit.quantity - unit.fileLength) / unit.fileLength
            );

            unitScore.rankBonus = rankBonus;
          }
        }
      });
    });
  }),
  immerOn(RoosterStoreActions.updateMessages, (state, action) => {
    state.messages[action.messageName] = action.message;
  }),
  immerOn(RoosterStoreActions.combatResult, (state, action) => {
    let playerScoreSum: number[] = [0, 0];
    state.players.forEach((player, index) => {
      let sum = player.score[player.score.length - 1];
      playerScoreSum[index] =
        sum.challengeOverkill +
        sum.charge +
        sum.otherBonus +
        sum.positionBonus +
        sum.rankBonus +
        sum.standard +
        sum.woundsDealt;
    });
    state.messages.prompt = '';
    state.messages.combatEnd = getWinner(playerScoreSum);
  })
);
