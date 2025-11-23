import { Pokemon } from '@/pokemons/interfaces';
import { PokemonsServices } from '@/pokemons/services/pokemons.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.html',
})
export default class PokemonPage implements OnInit {
  
  private pokemosService = inject(PokemonsServices);
  private route = inject(ActivatedRoute); // Inyección del servicio de pokemones
  private title = inject(Title);
  private meta  = inject(Meta);
  public pokemon = signal<Pokemon | null>(null);
  
  
  ngOnInit(): void {
    this.loadPokemon();
  } 

  loadPokemon() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.pokemosService.getPokemonById(id).pipe(
          tap(({name, id, imageUrl})=>{
            const titlePage = `#${id} - ${this.capitalize(name)}`;
            const description = `Details and abilities of pokemon ${this.capitalize(name)}`;
            this.title.setTitle(titlePage);
            this.meta.updateTag({name:'title', content:titlePage})
            this.meta.updateTag({name:'description', content:description})
            this.meta.updateTag({property:'og:title', content:`${this.capitalize(name)} - Details`})
            this.meta.updateTag({property:'og:description', content:description})
            this.meta.updateTag({property:'og:image', content:imageUrl});
            this.meta.updateTag({property: 'keywords', content: `${name}, pokemon, abilities, height`});
          })
        ).subscribe(pokemon=>{
      this.pokemon.set(pokemon);
    });
  }

  capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
