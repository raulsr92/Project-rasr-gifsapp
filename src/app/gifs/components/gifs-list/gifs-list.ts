import { ChangeDetectionStrategy, Component } from '@angular/core';

import { GifsListItem } from './gifs-list-item/gifs-list-item';

@Component({
  selector: 'app-gifs-list',
  imports: [GifsListItem],
  templateUrl: './gifs-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsList { }
