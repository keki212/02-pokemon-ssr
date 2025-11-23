import { SimplePokemon } from '@/pokemons/interfaces';
import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'pokemon-card',
  imports: [RouterLink],
  templateUrl: './pokemon-card.html',
})
export class PokemonCard {
  pokemon = input.required<SimplePokemon>();
  public readonly pokemonImage = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
      this.pokemon().id
    }.png`;
  });

  // logEffect = effect(()=>{
  //   console.log('En pokemon card: ',this.pokemon());
  // })

  // ngOnInit(): void {
  //   this.imgUrl.set(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`)
  // }
}
