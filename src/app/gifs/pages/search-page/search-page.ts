import {  Component, inject, signal } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { GifsList } from '../../components/gifs-list/gifs-list';
import { Gif } from '../../interfaces/gif.interface';
import { GifMapper } from '../../mapper/gif.mapper';

@Component({
  selector: 'app-search-page',
  imports: [GifsList],
  templateUrl: './search-page.html',
})
export default class SearchPage {
    //signals del componente

      searchedGifs = signal<Gif[]>([])

    //inyección servicio

      gifService = inject(GifService)

    //métodos del componente

      onSearch(query:string, event:Event){
        console.log(query)

        this.gifService.searchGifs(query).subscribe(
          (respuestaGifs)=>{

            console.log(respuestaGifs)

            this.searchedGifs.set(respuestaGifs)

        })

        const inputElement = event.target as HTMLInputElement
        inputElement.value = ""

      }

 }
