import {  Component } from '@angular/core';
import { GifsList } from '../../components/gifs-list/gifs-list';

@Component({
  selector: 'app-trending-page',
  imports: [GifsList],
  templateUrl: './trending-page.html',
})
export default class TrendingPage { }
