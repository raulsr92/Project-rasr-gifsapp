import { ChangeDetectionStrategy, Component,input } from '@angular/core';
import { GifsListItem } from './gifs-list-item/gifs-list-item';



@Component({
  selector: 'app-gifs-list',
  imports: [GifsListItem],
  templateUrl: './gifs-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsList {

    imagenUrls = input.required<string[]>()

}
