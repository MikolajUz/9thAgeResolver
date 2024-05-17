import { Component, Input } from '@angular/core';
import { RoosterFacade } from '../../../rooster.facade';

@Component({
  selector: 'app-rooster-loader',
  templateUrl: './rooster-loader.component.html',
  styleUrls: ['./rooster-loader.component.scss'],
})
export class RoosterLoaderComponent {
  @Input() playerIndex!: number;
  validFile = false;
  constructor(private roosterFacade: RoosterFacade) {}

  onDragOver(event: any) {
    event.preventDefault();
  }
  onDropSuccess(event: any) {
    event.preventDefault();
    event.dataTransfer.files.length < '2' &&
      this.onFileChange(event.dataTransfer.files);
  }
  onChange(event: any) {
    this.onFileChange(event.target.files);
  }

  isTxt(name: string) {
    return name.slice(-4) === '.txt';
  }

  private onFileChange(files: any) {
    if (this.isTxt(files[0].name)) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        typeof reader.result === 'string' &&
          this.roosterFacade.requestRoosterLoad(reader.result, this.playerIndex, 0);
      });
      reader.readAsText(files[0]);
    } else this.validFile = true;
  }
}
