import { TestBed } from "@angular/core/testing";
import { PokemonsServices } from "./pokemons.service";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { PokemonsResponse, SimplePokemon } from "../interfaces";
import { mockApiResponse } from "../mappers/pokemon-maper.spec";
import { catchError, of } from "rxjs";

const mockPokemonsResponse: PokemonsResponse = {
    "count": 1328,
    "next": "https://pokeapi.co/api/v2/pokemon?offset=3&limit=3",
    "previous": null,
    "results": [
        {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },
        {
            "name": "ivysaur",
            "url": "https://pokeapi.co/api/v2/pokemon/2/"
        },
        {
            "name": "venusaur",
            "url": "https://pokeapi.co/api/v2/pokemon/3/"
        }
    ]
}

const expectedPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur'},
  { id: '2', name: 'ivysaur'},
  { id: '3', name: 'venusaur'},
];

const mockPokemon = {
    id: 1,
    name: 'bulbasaur'
}

describe('PokemonsService', () => {
  let service: PokemonsServices;
  //let http = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        //{ provide: HttpClient, useValue: http }
        provideHttpClient(), provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PokemonsServices);
    //http = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() =>{
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of SimplePokemons', () =>{

    service.loadPage(1).subscribe((pokemons) =>{
        expect(pokemons).toEqual(expectedPokemons);
    })

    const req = httpMock.expectOne(
        `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`
    )

    expect(req.request.method).toBe('GET');

    req.flush(mockPokemonsResponse);

  });

  it('should load page 5 of SimplePokemons', () =>{

    service.loadPage(5).subscribe((pokemons) =>{
        expect(pokemons).toEqual(expectedPokemons);
    })

    const req = httpMock.expectOne(
        `https://pokeapi.co/api/v2/pokemon?offset=80&limit=20`
    )

    expect(req.request.method).toBe('GET');

    req.flush(mockPokemonsResponse);

  });

  it('should load pokemon by id', () =>{

    service.getPokemonById('25').subscribe((pokemon: any) =>{
        expect(pokemon.name).toEqual('pikachu');
    })

    const req = httpMock.expectOne(
        `https://pokeapi.co/api/v2/pokemon/25`
    )

    expect(req.request.method).toBe('GET');

    req.flush(mockApiResponse);

  });

  it('should get pokemon names', (done) =>{

    service.getPokemonNames().then((names) =>{
        expect(names).toEqual(['bulbasaur', 'ivysaur', 'venusaur']);
        done();
    });
    
    const req = httpMock.expectOne(
        `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockPokemonsResponse);    
    });

  // trigger errors
  it('should catch error if pokemon not found',()=>{
    const pokemonName = 'I-do-not-exist'

    service.loadPokemon(pokemonName).pipe(
      catchError((err: any) =>{
        // return a fallback observable so the stream stays valid for subscribe assertions
        // console.log(err);
        expect(err.message).toBe('Pokemon not found');
        return of(mockPokemon);
      })
    ).subscribe((pokemon: any) =>{
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    expect(req.request.method).toBe('GET');

    req.flush('Pokemon not found',{
      status: 404,
      statusText: 'Not Found'
    })
  });

});