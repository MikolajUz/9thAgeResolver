import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { skirmishScore } from '../../../../interfaces/skirmishScore.interface';
import { MainFacade } from '../../../../main.facade';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent {
  constructor(private mainFacade: MainFacade) {}
  @Input() player!: number;

  columns = [
    'Name',
    'Wounds',
    'Standard',
    'RankBonus',
    'PositionBonus',
    'Charge',
    'Other',
  ];

  scores$!: Observable<skirmishScore[]>;

  ngOnInit(): void {
    this.scores$ = this.mainFacade.getPlayerScore$(this.player);
  }
}
