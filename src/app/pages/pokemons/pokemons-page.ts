import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap} from 'rxjs';

import { PokemonList } from "@/pokemons/components/pokemon-list/pokemon-list";
import { PokemonListSkeleton } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton";
import { PokemonsServices } from '@/pokemons/services/pokemons.service';
import { SimplePokemon } from '@/pokemons/interfaces';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonListSkeleton, PokemonList],
  templateUrl: './pokemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage implements OnInit /*, OnDestroy*/ {
  private pokemonsService = inject(PokemonsServices); // Inyección del servicio de pokemones
  pokemons = signal<SimplePokemon[]>([]); // Signal para almacenar la lista de pokemones

  private route = inject(ActivatedRoute); // Inyección de ActivatedRoute para acceder a los parámetros de la ruta
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map(params =>params.get('page') ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1, page))
    ), 
  )


  // isLoading = signal<boolean>(true);
  
  // private appRef = inject(ApplicationRef);
  
  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log('Application is stable:', isStable);
  //   if (isStable) {
  //     this.isLoading.set(false);
  //     this.$appState.unsubscribe();
  //   }
  // });
  
  ngOnInit(): void {
    this.loadPokemos(0);
    // Simulate loading
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
  }

  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }

  public loadPokemos(page: number) {
    const pageToLoad = this.currentPage()! + page;
    // this.router.navigate([], {
    //   queryParams: { page: pageToLoad },
    // });
    this.pokemonsService.loadPage(pageToLoad)
    .pipe(
      tap(()=>this.router.navigate([], {
        queryParams: { page: pageToLoad },
      })),
      tap(()=>this.title.setTitle(`Pokemons - Page ${pageToLoad}`))
    ).subscribe(pokemons=>{
      this.pokemons.set(pokemons);
    });
  }

}
