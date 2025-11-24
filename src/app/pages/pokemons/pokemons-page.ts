import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap} from 'rxjs';

import { PokemonList } from "@/pokemons/components/pokemon-list/pokemon-list";
import { PokemonListSkeleton } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton";
import { PokemonsServices } from '@/pokemons/services/pokemons.service';
import { SimplePokemon } from '@/pokemons/interfaces';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonListSkeleton, PokemonList, RouterLink],
  templateUrl: './pokemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage /*implements  OnInit , OnDestroy*/ {
  private pokemonsService = inject(PokemonsServices); // Inyección del servicio de pokemones
  pokemons = signal<SimplePokemon[]>([]); // Signal para almacenar la lista de pokemones

  private route = inject(ActivatedRoute); // Inyección de ActivatedRoute para acceder a los parámetros de la ruta
  // private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map(params =>params['page'] ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1, page))
    ), 
  )

  public loadOnPageChange = effect(()=>{
    //console.log('Page changed:', this.currentPage());
    this.loadPokemos();
  })


  // isLoading = signal<boolean>(true);
  
  // private appRef = inject(ApplicationRef);
  
  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log('Application is stable:', isStable);
  //   if (isStable) {
  //     this.isLoading.set(false);
  //     this.$appState.unsubscribe();
  //   }
  // });
  
  // ngOnInit(): void {
  //   this.loadPokemos(0);
  //   Simulate loading
  //   setTimeout(() => {
  //     this.isLoading.set(false);
  //   }, 5000);
  // }

  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }

  public loadPokemos(): void {
    const pageToLoad = this.currentPage()!;
    // this.router.navigate([], {
    //   queryParams: { page: pageToLoad },
    // });
    this.pokemonsService.loadPage(pageToLoad)
    .pipe(
      // tap(()=>this.router.navigate([], {
      //   queryParams: { page: pageToLoad },
      // })),
      tap(()=>this.title.setTitle(`Pokemons - Page ${pageToLoad}`))
    ).subscribe(pokemons=>{
      this.pokemons.set(pokemons);
    });
  }

}
