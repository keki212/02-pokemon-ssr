import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, firstValueFrom, map, Observable, tap, throwError } from 'rxjs';
import { Pokemon, PokemonsResponse, SimplePokemon } from '../interfaces';
import { PokemonResponse } from '../interfaces/pokemon.interface';
import { PokemonMapper } from '../mappers/pokemon-maper';

@Injectable({
  providedIn: 'root',
})
export class PokemonsServices {
  private http = inject(HttpClient);
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  public loadPage(page: number = 0): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }
    page = Math.max(0, page);

    return this.http.get<PokemonsResponse>(`${this.baseUrl}?offset=${page * 20}&limit=20`).pipe(
      map((resp) => {
        const simplePokemons: SimplePokemon[] = resp.results.map((pokemon) => ({
          id: pokemon.url.split('/').at(-2) ?? '',
          name: pokemon.name,
        }));
        return simplePokemons;
      })
      //tap(console.log)
    );
  }

  public async getPokemonNames(): Promise<string[]> {
    const observable = this.http
      .get<PokemonsResponse>(`${this.baseUrl}?offset=0&limit=20`)
      .pipe(map((resp) => resp.results.map((pokemon) => pokemon.name)));

    return await firstValueFrom(observable);
  }

  public getPokemonById(id: string): Observable<Pokemon> {
    return this.http
      .get<PokemonResponse>(`${this.baseUrl}/${id}`)
      .pipe(map((pokemon) => PokemonMapper.toPokemon(pokemon)));
  }

  public loadPokemon(id: string){
    return this.http.get<Pokemon>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse){
    if( error.status === 0){
      console.log('An error occurred', error.error);
    }else{
      console.log(`Backend returned code ${error.status}, body: `, error.error)
    }

    const errorMessage = error.error ?? 'An error occurred';

    return throwError(() => new Error(errorMessage));

  }
}
