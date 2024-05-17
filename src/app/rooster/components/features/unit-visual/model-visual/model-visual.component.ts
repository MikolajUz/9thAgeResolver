import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { unitUI } from '../../../../interfaces/unit-ui.interface';

@Component({
  selector: 'app-model-visual',
  templateUrl: './model-visual.component.html',
  styleUrls: ['./model-visual.component.scss'],
})
export class ModelVisualComponent {
  @Input() data!: Observable<unitUI | undefined>;
  @Input() playerIndex!: number;
  @Input() ID!: string;
  @Input() unit!: HTMLDivElement;
  @Input() orientation!: 'top' | 'bottom';

  constructor() {}
}
