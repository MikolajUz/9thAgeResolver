import { Component, OnInit } from '@angular/core';
import { MainFacade } from './main/main.facade';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private mainFacade: MainFacade) {}
  ngOnInit(): void {
    this.mainFacade.init();
  }
  title = '9thAgeBattleResolver';
}
