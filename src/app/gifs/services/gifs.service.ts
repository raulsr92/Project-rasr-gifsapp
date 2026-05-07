
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';

@Injectable({providedIn: 'root'})

export class GifService {

  envs = environment

  //inyectar dependencia http

  private http = inject(HttpClient)

  constructor(){
    this.loadTrendingGifs()
  }

  loadTrendingGifs(){

    this.http.get<GiphyResponse>(`${this.envs.giphyUrl}/gifs/trending`,{
      params:{
        api_key: this.envs.giphyApiKey,
        limit: 20
      }
    })


  }
}
