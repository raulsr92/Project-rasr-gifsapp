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

    scrollSectionRef = viewChild<ElementRef<HTMLElement>>('sectionScroll')

    //Inyectar servicio de petición http GET
      gifService = inject(GifService)


    //Métodos

      onScroll(event: Event){
        const scrollSection = this.scrollSectionRef()?.nativeElement

        if (!scrollSection) return;

        const scrollTop = scrollSection.scrollTop;
        const clientHeight = scrollSection.clientHeight;
        const scrollHeight = scrollSection.scrollHeight;

        //console.log({scrollTotal:scrollTop+clientHeight, scrollHeight})

        const isAtBottom = scrollTop + clientHeight + 150 >= (scrollHeight-1)

        console.log({isAtBottom:isAtBottom})

        //Hacer la petición
        if(isAtBottom){

          //TODO: cargar la siguiente página de Gifs

        }
      }
 }
