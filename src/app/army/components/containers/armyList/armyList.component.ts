import { Component } from '@angular/core';
import { ArmyFacade } from '../../../army.facade';

@Component({
  selector: 'app-armyList',
  templateUrl: './armyList.component.html',
  styleUrls: ['./armyList.component.scss'],
})
export class ArmyListComponent {
  armyList$ = this.armyFacade.getArmy();
  constructor(private armyFacade: ArmyFacade) {
    this.armyFacade.requestLoadArmy;
  }
}
