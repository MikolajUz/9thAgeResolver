import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BattlePlayer } from '../interfaces/battlePlayer.interface';
import { BattleUnitAdapter } from '../interfaces/adapters/battleUnitData.adapter';
import { Unit } from '../../army/interfaces/unit.interface';
import { BattleUnitData } from '../interfaces/battleUnitData.interface';
import { attacksData } from '../interfaces/attacksData.interface';
import { skirmishScore } from '../interfaces/skirmishScore.interface';
import { RoosterFacade } from '../../rooster/rooster.facade';
import { MainFacade } from '../main.facade';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    private roosterFacade: RoosterFacade,
    private mainFacade: MainFacade,
    private adapter: BattleUnitAdapter
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  battleData: BattlePlayer[] = [];
  mainAGI: number = 0;
  fightUnits: BattleUnitData[] = [];

  checkArrayProp = (array: any[], propName: string, propValue: any) => {
    let retVal: boolean = false;
    array.forEach((elem) =>
      elem.propName === propValue ? (retVal = true) : null
    );
    return retVal;
  };

  createBattleData() {
    const checkYPosition = (
      playerIndex: number,
      RFy: number,
      lastRankNumber: number,
      unit: Unit
    ): Boolean => {
      if (playerIndex === 0) {
        if (RFy - unit.unitUI.unitRFHeight / 4 > 0) {
          this.roosterFacade.updateMessages(
            `Please move player ${
              playerIndex + 1
            } last rank RF to proper place `,
            'prompt'
          );
          return false;
        }
      }
      if (playerIndex === 1) {
        if (
          RFy + unit.unitUI.unitRFHeight / 4 <
          lastRankNumber * unit.unitUI.unitRFHeight
        ) {
          this.roosterFacade.updateMessages(
            `Please move player ${
              playerIndex + 1
            } last rank RF to proper place `,
            'prompt'
          );

          return false;
        }
      }
      return true;
    };

    const createRestRFarray = (
      playerIndex: number,
      unit: Unit,
      unitDOM: any
    ): boolean[] => {
      let RFlastRankPositions: boolean[] = [];
      if (unit.unitUI.RaFRest.length > 0) {
        let lastRankNumber = unit.unitUI.fileYPlaces.length;
        let rankSectionsArray: number[] = [0];
        for (
          let RFrest = 0;
          RFrest < unit.unitUI.rankXPlaces.length;
          RFrest++
        ) {
          rankSectionsArray.push(
            (RFrest + 1) * Number(unit.unitUI.unitRFWidth)
          );
        }

        for (
          let RFrest = 0;
          RFrest < unit.unitUI.rankXPlaces.length;
          RFrest++
        ) {
          RFlastRankPositions.push(false);
        }

        for (let RFrest = 0; RFrest < unit.unitUI.RaFRest.length; RFrest++) {
          let RF = this.renderer.selectRootElement(
            `[id='${unitDOM.id},x=${RFrest},y=${lastRankNumber}']`,
            true
          );

          let RFy: number = Number(
            RF.style.transform.split(',')[1].slice(0, -3).trim()
          );

          if (!checkYPosition(playerIndex, RFy, lastRankNumber, unit)) {
            this.battleData = [];
            return RFlastRankPositions;
          }

          let RFx: number = Number(
            RF.style.transform.split(',')[0].slice(10, -2).trim()
          );
          let RFxMiddle: number = RFx + Number(unit.unitUI.unitRFWidth) / 2;

          for (let index = 0; index < rankSectionsArray.length - 1; index++) {
            if (
              rankSectionsArray[index] <= RFxMiddle &&
              RFxMiddle < rankSectionsArray[index + 1]
            ) {
              RFlastRankPositions[index] = true;
            }
          }
        }
      }
      return RFlastRankPositions;
    };

    const createContactArray = (
      files: number,
      ranks: number,
      restArray: boolean[]
    ): (string | boolean)[][][] => {
      let retArray: (string | boolean)[][][] = Array.from(Array(ranks), () =>
        Array.from(Array(files), () => Array.from(Array(), () => ''))
      );
      if (restArray.length > 0) {
        retArray[retArray.length - 1].map((file, index) => {
          if (!restArray[index]) file.push(false);
        });
      }
      return retArray;
    };

    this.battleData = [];
    this.battleData.push(new BattlePlayer([]));
    this.battleData.push(new BattlePlayer([]));

    this.battleData.forEach((player, index) => {
      this.roosterFacade.getBattleUnits(index).forEach((unit) => {
        let unitDOM = this.renderer.selectRootElement(
          `[id='PlayerIndex=${index},unitID=${unit.ID}']`,
          true
        );

        this.battleData[index].battlePlayer.push(
          this.adapter.adapt(
            index,
            this.mainFacade.gridUnit,
            unit.unitUI.rankXPlaces.length,
            unit.unitUI.fileYPlaces.length,
            {
              x: unitDOM.style.transform.split(',')[0].slice(10, -2).trim(),
              y: unitDOM.style.transform.split(',')[1].slice(0, -3).trim(),
            },
            unit.unitUI.unitRFWidth,
            unit.unitUI.unitWidth,
            unit.unitUI.unitRFHeight,
            unit.unitUI.unitHeight,
            unit.quantity,
            unit.ID,
            unit.agi,
            createRestRFarray(index, unit, unitDOM),
            createContactArray(
              unit.unitUI.rankXPlaces.length,
              unit.unitUI.unitFileGrids.length,
              createRestRFarray(index, unit, unitDOM)
            ),
            new skirmishScore(
              unit.name,
              0,
              index,
              unit.ID,
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
            ),
            unit.wounds,
            unit.quantity
          )
        );
      });
    });
  }

  getAmountInContact = () => {
    this.createBattleData();

    const checkContact = (
      battleUnit0: BattleUnitData,
      battleUnit1: BattleUnitData
    ): boolean => {
      const battleUnit0ContactY: number =
        Number(battleUnit0.startPoint.y) + battleUnit0.height;
      let offset: number;
      battleUnit0.RFheight > battleUnit1.height
        ? (offset = battleUnit1.RFheight / 4)
        : (offset = battleUnit0.RFheight / 4);
      if (
        Math.abs(battleUnit0ContactY - Number(battleUnit1.startPoint.y)) <
        offset
      )
        return true;
      else return false;
    };

    const divideUp = (operand1: number, operand2: number) => {
      return (
        Math.trunc(operand1 / operand2) +
        Math.ceil(operand1 / operand2 - Math.trunc(operand1 / operand2))
      );
    };

    this.battleData[0].battlePlayer.forEach((unit0) => {
      this.battleData[1].battlePlayer.forEach((unit1) => {
        if (checkContact(unit0, unit1)) {
          const fillContactArray = (
            startIndex: number,
            endIndex: number,
            atkUnit: BattleUnitData,
            defUnit: BattleUnitData
          ) => {
            for (let rank = 0; rank < atkUnit.contactArray.length; rank++) {
              for (let index = startIndex; index < endIndex; index++) {
                atkUnit.contactArray[rank][index][0] !== false
                  ? atkUnit.contactArray[rank][index].push(
                      `DefPlr=${defUnit.playerIndex},DefID=${defUnit.ID}`
                    )
                  : null;
              }
            }
          };

          let x0s = Number(unit0.startPoint.x);
          let x0e = Number(unit0.startPoint.x) + Number(unit0.width);
          let x1s = Number(unit1.startPoint.x);
          let x1e = Number(unit1.startPoint.x) + Number(unit1.width);

          if (x1s <= x0s && x0s <= x1e && x1e <= x0e) {
            let endIndex = divideUp(x1e - x0s, unit0.RFwidth);

            if (endIndex === 0) endIndex = 1;
            fillContactArray(0, endIndex, unit0, unit1);
            endIndex = divideUp(x1e - x0s, unit1.RFwidth);

            if (endIndex === 0) endIndex = 1;
            fillContactArray(unit1.files - endIndex, unit1.files, unit1, unit0);
          }

          if (x0s <= x1s && x1s <= x0e && x0e < x1e) {
            let endIndex = divideUp(x0e - x1s, unit0.RFwidth);
            if (endIndex === 0) endIndex = 1;
            fillContactArray(unit0.files - endIndex, unit0.files, unit0, unit1);
            endIndex = divideUp(x0e - x1s, unit1.RFwidth);
            if (endIndex === 0) endIndex = 1;
            fillContactArray(0, endIndex, unit1, unit0);
          }

          if (x1s < x0s && x0s < x1e && x0e < x1e) {
            fillContactArray(0, unit0.files, unit0, unit1);
            let startIndex =
              divideUp(
                Number(unit0.startPoint.x) - Number(unit1.startPoint.x),
                unit1.RFwidth
              ) - 1;
            let endIndex =
              unit1.files -
              divideUp(
                Number(unit1.startPoint.x) +
                  unit1.width -
                  (Number(unit0.startPoint.x) + unit0.width),
                unit1.RFwidth
              ) +
              1;

            fillContactArray(startIndex, endIndex, unit1, unit0);
          }
          if (x0s < x1s && x1s < x0e && x0e > x1e) {
            let startIndex =
              divideUp(
                Number(unit1.startPoint.x) - Number(unit0.startPoint.x),
                unit0.RFwidth
              ) - 1;
            let endIndex =
              unit0.files -
              divideUp(
                Number(unit0.startPoint.x) +
                  unit0.width -
                  (Number(unit1.startPoint.x) + unit1.width),
                unit0.RFwidth
              ) +
              1;

            fillContactArray(startIndex, endIndex, unit0, unit1);
            fillContactArray(0, unit1.files, unit1, unit0);
          }
        }
      });
    });
  };

  resolveSkirmish(offBattleUnit: BattleUnitData): attacksData[] {
    const toHit = (offensiveSkill: number, defensiveSkill: number) => {
      let skillDif = offensiveSkill - defensiveSkill;
      if (skillDif >= 4) return 2;
      if (1 <= skillDif && skillDif <= 3) return 3;
      if (0 >= skillDif && skillDif >= -3) return 4;
      if (-4 >= skillDif && skillDif >= -7) return 5;
      if (skillDif <= -8) return 6;
      return 1000;
    };

    const toWound = (strength: number, resilience: number) => {
      let powerDif = strength - resilience;
      if (powerDif >= 2) return 2;
      if (powerDif === 1) return 3;
      if (powerDif === 0) return 4;
      if (powerDif === -1) return 5;
      if (powerDif <= -2) return 6;
      return 1000;
    };

    const toAS = (armourPenetration: number, armour: number) => {
      let armourDif = armour - armourPenetration;
      if (armourDif >= 5) return 2;
      if (armourDif === 4) return 3;
      if (armourDif === 3) return 4;
      if (armourDif === 2) return 5;
      if (armourDif === 1) return 6;
      if (armourDif <= 0) return 7;
      return 1000;
    };

    const toSpecial = (save: number) => {
      if (save === 0) return 1000;
      return save;
    };

    const roll = (diceType: number): number => {
      return Math.floor(Math.random() * diceType) + 1;
    };
    const dicesThrow = (dicesNmb: number): number[] => {
      let dicesResults = [];
      for (let dice = 0; dice < dicesNmb; dice++) {
        dicesResults.push(roll(6));
      }
      return dicesResults;
    };

    const successNmb = (dicesResults: number[], toHit: number) => {
      let successNumber = 0;
      dicesResults.forEach((result) =>
        result >= toHit ? successNumber++ : null
      );
      return successNumber;
    };

    const getAttacks = (
      unit: Unit,
      battleUnit: BattleUnitData
    ): attacksData[] => {
      let nmbOfRanksHit = 1;

      unit.unitUI.unitFileGrids.length > 1 ? (nmbOfRanksHit = 2) : null;
      battleUnit.files > 7 ? (nmbOfRanksHit = 3) : null;

      let supportAtt = 1;
      if (unit.height === 'Large') {
        unit.att >= 3 ? (supportAtt = 3) : (supportAtt = unit.att);
      }
      if (unit.height === 'Gigantic') {
        unit.att >= 5 ? (supportAtt = 5) : (supportAtt = unit.att);
      }

      let attacks: attacksData[] = [];

      for (let rank = 0; rank < unit.unitUI.unitFileGrids.length; rank++) {
        for (let file = 0; file < battleUnit.files; file++) {
          battleUnit.contactArray[rank][file].forEach((id) => {
            if (attacks.length === 0) {
              if (typeof id === 'string')
                attacks.push(
                  new attacksData(
                    id,
                    0,
                    [],
                    0,
                    0,
                    [],
                    0,
                    0,
                    [],
                    0,
                    0,
                    [],
                    0,
                    0,
                    0
                  )
                );
            }

            let temp = 0;
            attacks.forEach((attack) => {
              if (attack.attackedUnitID === id) {
                temp++;
              }
            });
            if (typeof id === 'string' && temp === 0)
              attacks.push(
                new attacksData(
                  id,
                  0,
                  [],
                  0,
                  0,
                  [],
                  0,
                  0,
                  [],
                  0,
                  0,
                  [],
                  0,
                  0,
                  0
                )
              );
          });
        }
      }

      for (let file = 0; file < battleUnit.files; file++) {
        battleUnit.contactArray[0][file].forEach((id) => {
          attacks.forEach((attack) => {
            if (attack.attackedUnitID === id)
              attack.attacksNmb = attack.attacksNmb + unit.att;
          });
        });
      }

      for (let rank = 1; rank < nmbOfRanksHit; rank++) {
        for (let file = 0; file < battleUnit.files; file++) {
          battleUnit.contactArray[rank][file].forEach((id) => {
            attacks.forEach((attack) => {
              if (attack.attackedUnitID === id)
                attack.attacksNmb = attack.attacksNmb + supportAtt;
            });
          });
        }
      }
      return attacks;
    };

    let offUnit = this.roosterFacade.getRoosterUnitByID(
      offBattleUnit.playerIndex,
      0,
      offBattleUnit.ID
    );

    let attacks = getAttacks(offUnit, offBattleUnit);
    attacks.forEach((attacks, index) => {
      let defUnit = this.roosterFacade.getRoosterUnitByID(
        Number(attacks.attackedUnitID.split(',')[0].split('=')[1]),
        0,
        Number(attacks.attackedUnitID.split(',')[1].split('=')[1])
      );
      attacks.hitRolls = dicesThrow(attacks.attacksNmb);
      attacks.toHit = toHit(offUnit.of, defUnit.def);
      attacks.hits = successNmb(attacks.hitRolls, attacks.toHit);

      attacks.woundRolls = dicesThrow(attacks.hits);
      attacks.toWound = toWound(offUnit.str, defUnit.res);
      attacks.wounds = successNmb(attacks.woundRolls, attacks.toWound);

      attacks.armourRolls = dicesThrow(attacks.wounds);
      attacks.toArmour = toAS(offUnit.ap, defUnit.arm);
      attacks.armourSaved = successNmb(attacks.armourRolls, attacks.toArmour);

      if (
        defUnit.aeg !== null ||
        this.checkArrayProp(defUnit.rules, 'name', 'Fortitude')
      ) {
        attacks.specialRolls = dicesThrow(attacks.wounds - attacks.armourSaved);
        attacks.toSpecial = toSpecial(Number(defUnit.aeg));
        attacks.specialSaved = successNmb(
          attacks.specialRolls,
          attacks.toSpecial
        );
      }
      attacks.finalWounds =
        attacks.wounds - attacks.armourSaved - attacks.specialSaved;
    });

    return attacks;
  }

  getAllUnitData = () => {
    let fightUnits: BattleUnitData[] = [];

    this.battleData.forEach((player) => {
      player.battlePlayer.forEach((unit) => {
        fightUnits.push(unit);
      });
    });
    return fightUnits;
  };

  initScores = () => {
    this.battleData.forEach((player) => {
      player.battlePlayer.forEach((unit) => {
        let name = this.roosterFacade.getPropertyOfRoosterUnit(
          unit.playerIndex,
          0,
          unit.ID,
          'name'
        );

        this.roosterFacade.scoreInit(unit.playerIndex, unit.ID, name!);
      });
    });
    this.roosterFacade.scoreInit(0, 100, 'Sum');
    this.roosterFacade.scoreInit(1, 100, 'Sum');
  };

  getRankBonus = () => {
    this.fightUnits.forEach((battleUnit) => {
      let unit = this.roosterFacade.getRoosterUnitByID(
        battleUnit.playerIndex,
        0,
        battleUnit.ID
      );
      let rankSize = 5;
      if (unit.height === 'Large') rankSize = 3;

      if (unit.fileLength < 8 && unit.fileLength >= rankSize) {
        let rankBonus = Math.trunc(
          (unit.quantity - unit.fileLength) / unit.fileLength
        );
        this.roosterFacade.updateScore(
          battleUnit.playerIndex,
          battleUnit.ID,
          'rankBonus',
          rankBonus
        );
      }
    });
  };

  finishedSkirmish = () => {
    this.mainAGI = 0;
    this.roosterFacade.getRanks();
    this.roosterFacade.scoreSum();
    this.roosterFacade.combatResult();
  };

  resolveHit = () => {
    this.getAmountInContact();
    this.fightUnits = this.getAllUnitData();

    for (this.mainAGI; this.mainAGI > 0; this.mainAGI--) {
      let hitUnits: BattleUnitData[];

      hitUnits = this.fightUnits.filter(
        (unit) => unit.currentAgi === this.mainAGI
      );

      hitUnits.forEach((unit) => {
        let totalWounds = 0;
        let offPlayerIndex = unit.playerIndex;
        let offUnit = this.roosterFacade.getRoosterUnitByID(
          offPlayerIndex,
          0,
          unit.ID
        );
        let totalAttacks: attacksData[] = [];
        this.resolveSkirmish(unit).forEach((attack) => {
          let defPlayerIndex = Number(
            attack.attackedUnitID.split(',')[0].split('=')[1]
          );
          let unitIndex = Number(
            attack.attackedUnitID.split(',')[1].split('=')[1]
          );
          let defUnit = this.roosterFacade.getRoosterUnitByID(
            defPlayerIndex,
            0,
            unitIndex
          );
          totalAttacks.push(attack);

          let casualties = Math.trunc(attack.finalWounds / defUnit.hp);
          let wounds = attack.finalWounds % defUnit.hp;
          if (wounds + defUnit.wounds >= defUnit.hp) {
            casualties++;
            wounds = wounds + defUnit.wounds - defUnit.hp;
            this.roosterFacade.setWounds(unitIndex, defPlayerIndex, 0, wounds);
          }

          if (casualties < defUnit.quantity) {
            this.roosterFacade.decreaseQuantity(
              unitIndex,
              defPlayerIndex,
              0,
              casualties
            );

            this.roosterFacade.addWound(unitIndex, defPlayerIndex, 0, wounds);
          } else {
            this.roosterFacade.deleteUnit(unitIndex, defPlayerIndex, 0);
            this.fightUnits = this.fightUnits.filter(
              (unit) =>
                unit.ID !== unitIndex || unit.playerIndex !== defPlayerIndex
            );
          }

          this.roosterFacade.updateScore(
            offPlayerIndex,
            unit.ID,
            'attacks',
            totalAttacks
          );

          totalWounds = totalWounds + attack.finalWounds;
          this.roosterFacade.updateScore(
            offPlayerIndex,
            unit.ID,
            'woundsDealt',
            totalWounds
          );

          offUnit.options.forEach((option) => {
            option.slice(0, 15) === 'Standard Bearer'
              ? this.roosterFacade.updateScore(
                  offPlayerIndex,
                  unit.ID,
                  'standard',
                  1
                )
              : null;
          });
        });
      });

      if (hitUnits.length > 0) {
        this.mainAGI--;
        this.roosterFacade.updateMessages(
          'Reposition units and click resolve hit button to proceed to next agility step',
          'prompt'
        );
        if (this.fightUnits.every((unit) => unit.currentAgi > this.mainAGI)) {
          this.finishedSkirmish();
        }
        break;
      }
    }
  };

  runAllSkirmishes = () => {
    this.roosterFacade.updateMessages('', 'prompt');
    this.roosterFacade.updateMessages('', 'combatEnd');
    this.getAmountInContact();
    this.fightUnits = this.getAllUnitData();
    this.mainAGI = 10;
    this.roosterFacade.clearScore();
    this.initScores();
    this.resolveHit();
  };
}
