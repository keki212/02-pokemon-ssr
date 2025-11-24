import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { PokemonsServices } from './pokemons/services/pokemons.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [
        { page: '1' },
        { page: '2' },
        { page: '3' },
        { page: '4' },
        { page: '5' },
        { page: '6' },
        { page: '7' },
        { page: '8' },
        { page: '9' },
        { page: '10' },
      ];
    },
  },
  {
    path: 'pokemons/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const pokemonsService = inject(PokemonsServices);
      const ids: string[] = await pokemonsService.getPokemonNames();
      return ids.map((id) => ({ id: id }));
    },
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'pricing',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'contact',
    renderMode: RenderMode.Prerender,
  },
  // Otras rutas pueden seguir aquí...
  {
    path: '**',
    renderMode: RenderMode.Client, // Para el resto de rutas usa renderizado en cliente
  },
];
