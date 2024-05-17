import { Component, Input, OnInit } from '@angular/core';
import { Unit } from '../../../../army/interfaces/unit.interface';

import { Observable } from 'rxjs/internal/Observable';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { RoosterFacade } from '../../../rooster.facade';

@Component({
  selector: 'app-table-rooster',
  templateUrl: './table-rooster.component.html',
  styleUrls: ['./table-rooster.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TableRoosterComponent implements OnInit {
  @Input() playerIndex!: number;
  Rooster!: Observable<Unit[]>;
  columnsToDisplay = ['name', 'quantity', 'wounds', 'points'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand', 'pick'];

  columnsDef = [
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'quantity',
      header: 'Qty',
    },
    {
      key: 'wounds',
      header: 'Wds',
    },
    {
      key: 'points',
      header: 'Pts',
    },
  ];

  expandedUnit: Unit | undefined;

  constructor( private roosterFacade: RoosterFacade) {}
  ngOnInit(): void {
    this.Rooster = this.roosterFacade.getRooster(this.playerIndex, 0);
  }

  setFileLength($event: any, unitID: number) {
    this.roosterFacade.setFileLength(
      unitID,
      $event.target.value,
      this.playerIndex,
      0
    );
  }

  pickUnit(unit: Unit) {
    if (!unit.onBattlefield) {
      this.roosterFacade.pickUnit(unit.ID, this.playerIndex, 0);
      this.roosterFacade.changeOnBattlefieldProperty(
        unit.ID,
        this.playerIndex,
        0
      );
    }
  }

  selectUnit(unitID: number) {
    this.roosterFacade.selectUnit(unitID, this.playerIndex, 0);
  }

  changeStat(unitID: number, action: string) {
    switch (action) {
      case 'Increase quantity':
        this.roosterFacade.increaseQuantity(
          unitID,
          this.playerIndex,
          0,
          1
        );
        break;
      case 'Decrease quantity':
        this.roosterFacade.decreaseQuantity(
          unitID,
          this.playerIndex,
          0,
          1
        );
        break;
      case 'Add wound':
        this.roosterFacade.addWound(unitID, this.playerIndex, 0, 1);
        break;
      case 'Remove wound':
        this.roosterFacade.removeWound(unitID, this.playerIndex, 0, 1);
        break;
      case 'Delete unit':
        this.roosterFacade.deleteUnit(unitID, this.playerIndex, 0);
        break;
      default:
        console.log('Error button stat changer');
    }
  }
}
