import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { dataUnit } from '../interfaces/dataUnit.interface';
import { Unit, UnitAdapter } from '../interfaces/unit.interface';

@Injectable({
  providedIn: 'root',
})
export class ArmyService {
  constructor(private http: HttpClient, private adapter: UnitAdapter) {}

  url = 'https://www.9thbuilder.com/api/v1/ninth_age/armies/207';

  getArmy(): Observable<Unit[]> {
    return this.getAdaptedData(this.getArmyData());
  }

  getArmyData(): Observable<dataUnit> {
    return this.http.get<dataUnit>(this.url);
  }

  getAdaptedData(armyData: Observable<dataUnit>): Observable<Unit[]> {
    return armyData.pipe(
      map((dataUnit) =>
        dataUnit.units.map((rawData) => this.adapter.adapt(rawData))
      )
    );
  }
}
