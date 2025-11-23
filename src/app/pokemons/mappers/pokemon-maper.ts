import { Pokemon } from "../interfaces";
import { PokemonResponse } from "../interfaces/pokemon.interface";

export class PokemonMapper { 
    static toPokemon(apiResponse: PokemonResponse): Pokemon { 
        return{
            id: apiResponse.id,
            name: apiResponse.name,
            height: apiResponse.height,
            imageUrl: apiResponse.sprites.other?.['official-artwork'].front_default || '',
            cries: apiResponse.cries.latest ?? null,
            abilities: apiResponse.abilities?.map(ability => ability.ability?.name ?? '') || []
        }
      }
}