import {Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop'
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';
import { GifsList } from '../../components/gifs-list/gifs-list';

@Component({
  selector: 'app-gifs-history',
  imports: [GifsList],
  templateUrl: './gifs-history.html',
})
export default class GifsHistory {

  //inyección servicio
    gifService = inject(GifService)


  //Obtener los parámetros de la URL dinámica

    query = toSignal(
        inject(ActivatedRoute).params.pipe(

          map(({query}) => query)
        )
    )

  //signal computado para obtener los gifs en base al query

    gifsByKey = computed<Gif[]>(()=>{

      const query = this.query()

      return this.gifService.getHistoryGifs(query)

    })




  /*
  query2 = inject(ActivatedRoute).params.subscribe(
    params =>{
      console.log(params["query"])
    }
  )
  */

}
