import {  Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifsList } from '../../components/gifs-list/gifs-list';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  imports: [GifsList],
  templateUrl: './trending-page.html',
})
export default class TrendingPage {

    //protected readonly imageUrls = imageUrls
    //Referenciar elemento en html

    scrollSectionRef = viewChild<ElementRef>('sectionScroll')

    //Inyectar servicio de petición http GET
      gifService = inject(GifService)


    //Métodos

      onScroll(event: Event){
        const scrollSection = this.scrollSectionRef()?.nativeElement

        console.log(scrollSection)
      }
 }
