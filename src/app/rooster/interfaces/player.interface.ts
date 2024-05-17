import { skirmishScore } from "../../main/interfaces/skirmishScore.interface";
import { Rooster } from "./rooster.interface";

export interface Player {
    rooster: Rooster[];
    score : skirmishScore[]
  }