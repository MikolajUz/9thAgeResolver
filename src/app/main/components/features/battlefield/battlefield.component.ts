import { Component, ElementRef, ViewChild } from '@angular/core';
import { UnitDirective } from '../../../../rooster/components/features/unit.directive';

import { MainFacade } from '../../../main.facade';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss'],
})
export class BattlefieldComponent {
  @ViewChild(UnitDirective, { static: true }) unitInjectPlace!: UnitDirective;
  @ViewChild('battlefieldBoundaries') battlefield: ElementRef | undefined;

  width = 0;
  height = 0;
  gridUnit: number = 10;
  gridDensity = 60;
  gridsX = this.mainFacade.createGridArray(this.gridDensity);
  gridsY = this.mainFacade.createGridArray(this.gridDensity);
  gridUnitScss = `${this.gridUnit}px`;

  constructor(private mainFacade: MainFacade) {}

  ngAfterViewInit(): void {
    this.mainFacade.setGridUnit(
      this.gridUnit,
      this.unitInjectPlace,
      this.battlefield
    );
  }

  onResized(event: any): void {
    console.log('RESIZE REMOVE ERROR');
    this.width = Math.round(event.newRect.width);
    this.height = Math.round(event.newRect.height);
    this.gridUnit = Math.round(this.width / this.gridDensity);
    this.gridsX = this.mainFacade.createGridArray(
      Math.round(this.width / this.gridUnit)
    );
    this.gridsY = this.mainFacade.createGridArray(
      Math.round(this.height / this.gridUnit - 10)
    );
    this.gridUnitScss = `${this.gridUnit}px`;
    this.mainFacade.setGridUnit(
      this.gridUnit,
      this.unitInjectPlace,
      this.battlefield
    );
    this.mainFacade.updateAllUnitUIData();
  }
}
