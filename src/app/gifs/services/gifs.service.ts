
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';

import { map, tap } from 'rxjs';

import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';


@Injectable({providedIn: 'root'})

export class GifService {
  envs = environment

  //inyectar dependencia http
    private http = inject(HttpClient)

  //Señal para almacenar la respuesta del HTTP GET
    trendingGifs = signal<Gif[]>([])

    //searchedGifs = signal<Gif[]>([])

    trendingGifsLoading = signal(true)

  // Señal para almacenar caché

    searchHistory = signal<Record<string,Gif[]>>({})

  // Señal computada para almacenar las claves del objeto caché

    searchHistoryKeys = computed(()=>{

      const searchHistory = this.searchHistory()

      return Object.keys(searchHistory)

    })


  constructor(){
    this.loadTrendingGifs()
    console.log("Servicio creado")
  }

  // Método 1

    loadTrendingGifs(){
      this.http.get<GiphyResponse>(`${this.envs.giphyUrl}/gifs/trending`,{
        params:{
          api_key: this.envs.giphyApiKey,
          limit: 20
        }
      }).subscribe((gifRespuesta)=>{

        console.log(gifRespuesta.data)

        //Transformar la respuesta de []"GiphyResponse" en un [] "Gif"
        const gifs = GifMapper.mapGiphyItemsToGifArray(gifRespuesta.data)
        console.log({gifs})

        this.trendingGifs.set(gifs)

        this.trendingGifsLoading.set(false)
      }
    )
    }

  // Método 2

    searchGifs(query: string){

      return this.http.get<GiphyResponse>(`${this.envs.giphyUrl}/gifs/search`,{
        params:{
          q:query,
          api_key:this.envs.giphyApiKey,
          limit: 20,
        }
      }).pipe(
        map( ({data}) => data),

        map( (items)=> GifMapper.mapGiphyItemsToGifArray(items)),

        //Agregar efecto secundario para almacenar historial (Caché)

        tap(items => {

          this.searchHistory.update( itemsPrev => (
            { ...itemsPrev,
              [query.toLocaleLowerCase()]:items
            }))
          console.log(this.searchHistory())
          console.log(this.searchHistoryKeys())

        })
      )


    }
}
