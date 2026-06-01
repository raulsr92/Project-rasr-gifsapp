import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

const GIF_KEY = 'Caché de búsqueda';

const loadFromLocalStorage = ():Record<string,Gif[]> =>{
  const historialBusqueda = localStorage.getItem(GIF_KEY)
  console.log(historialBusqueda)
  return historialBusqueda ? JSON.parse(historialBusqueda) : {}
}


@Injectable({providedIn: 'root'})

export class GifService {
  envs = environment

  //inyectar dependencia http
    private http = inject(HttpClient)

  //Señal para almacenar la respuesta del HTTP GET
    trendingGifs = signal<Gif[]>([])

    //searchedGifs = signal<Gif[]>([])

    trendingGifsLoading = signal(false)

    private trendingPage = signal<number>(0)

  // Señal para almacenar caché

    searchHistory = signal<Record<string,Gif[]>>(loadFromLocalStorage())

  // Señal computada para almacenar las claves del objeto caché

    searchHistoryKeys = computed(()=>{

      const searchHistory = this.searchHistory()

      return Object.keys(searchHistory)

    })

  //Efecto para almacenar en localStorage

  saveToLocalStorage = effect(()=>{
      console.log( `Se guardó/actualizó el caché en localstorage `)

      const historyString = JSON.stringify(this.searchHistory())

      localStorage.setItem(GIF_KEY, historyString)

    }
  )


  constructor(){
    this.loadTrendingGifs()
    console.log("Servicio creado")
  }

  // Método 1: Gifs en tendencia (no hay búsqueda)

    loadTrendingGifs(){
      //Condición para la paginación
      if (this.trendingGifsLoading()) return
      this.trendingGifsLoading.set(true)

        this.http.get<GiphyResponse>(`${this.envs.giphyUrl}/gifs/trending`,{
          params:{
            api_key: this.envs.giphyApiKey,
            limit: 20,
            offset: this.trendingPage()*20
          }
        }).subscribe((gifRespuesta)=>{

          //console.log(gifRespuesta.data)

          //Transformar la respuesta de []"GiphyResponse" en un [] "Gif"
            const gifs = GifMapper.mapGiphyItemsToGifArray(gifRespuesta.data)
            //console.log({gifs})

          //Concatenar gifs a la señal que los almacena

            this.trendingGifs.update( currentArrayGifs => [...currentArrayGifs, ...gifs])

            console.log(this.trendingGifs())

          // Actualizar la señal que maneja la paginación

            console.log(`Paginación actual ${this.trendingPage()}`)

            this.trendingPage.update(paginacionActual => paginacionActual+1)

          //Cambiar la señal que controla el estado de la petición para permitir nuevamente una nueva

            this.trendingGifsLoading.set(false)
        }
    )
    }

  // Método 2: Búsqueda de Gifs

    searchGifs(query: string):Observable<Gif[]>{

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

  // Método 3: Obtener gifs de caché

    getHistoryGifs(query:string):Gif[]{

      return this.searchHistory()[query]  ?? [];

    }

}
