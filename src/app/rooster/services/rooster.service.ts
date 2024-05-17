import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { map } from 'rxjs';
import { Unit } from '../../army/interfaces/unit.interface';
import { ArmyFacade } from '../../army/army.facade';
import { RoosterFacade } from '../rooster.facade';

@Injectable({
  providedIn: 'root',
})
export class RoosterService {
  constructor(
    private armyFacade: ArmyFacade,
    private roosterFacade: RoosterFacade
  ) {}

  url = 'https://www.9thbuilder.com/api/v1/ninth_age/armies/207';

  getRoosterUnit(name: string): Observable<Unit | undefined> {
    return this.armyFacade.getArmyUnit(name);
  }

  readRooster(
    rooster: string,
    playerIndex: number,
    roosterIndex: number
  ): void {
    const createRoosterArray = (rooster: string) => {
      let correctRooster = rooster.replaceAll('-', ',');
      let lineArray = correctRooster.split('\n');
      let wordsArray: string[][] = [];

      lineArray.forEach((string) => {
        wordsArray.push(string.split(','));
      });
      wordsArray.forEach((line) => {
        line.forEach((word, index) => {
          line[index] = word.trim();
        });
      });

      wordsArray.forEach((line, index) => {
        if (line[1]) {
          let nameSplit = line[1].split(' ');
          if (!Number.isNaN(Number(nameSplit[0]))) {
            line.splice(1, 1, nameSplit[0]);
            nameSplit.shift();
            let unitName = nameSplit.toString();
            unitName = unitName.replaceAll(',', ' ');
            line.splice(2, 0, unitName);
          } else {
            line.splice(1, 0, '1');
          }
        }
      });

      return wordsArray;
    };
    const roosterAdapter = (
      unit: Unit | undefined,
      line: string[],
      index: number
    ): Unit | undefined => {
      if (unit) {
        unit = { ...unit };
        unit.ID = index;
        unit.points = Number(line[0]);
        unit.quantity = Number(line[1]);
        unit.name = line[2];
        unit.wounds = 0;
        unit.fileLength = 3;
        unit.onBattlefield = false;
        let optionsArray: string[] = [];
        line.forEach((unit, index) => {
          index > 2 && optionsArray.push(line[index]);
        });
        unit.options = optionsArray;
      }
      return unit;
    };

    createRoosterArray(rooster).forEach((line, index) => {
      this.getRoosterUnit(line[2])
        .pipe(map((unit) => roosterAdapter(unit, line, index)))
        .subscribe((unit) => {
          unit &&
            this.roosterFacade.addUnitToRooster(
              unit,
              playerIndex,
              roosterIndex
            );
        });
    });
  }
}
