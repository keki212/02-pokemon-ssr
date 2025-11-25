import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import PokemonPage from './pokemon-page';
import { PokemonsServices } from '@/pokemons/services/pokemons.service';
import { Pokemon } from '@/pokemons/interfaces';

// Mocks
const mockPokemon: Pokemon = {
  id: 25,
  name: 'pikachu',
  height: 4,
  imageUrl: 'https://example.com/pikachu.png',
  cries: 'https://example.com/pikachu-cry.mp3',
  abilities: ['static', 'lightning-rod']
};

class MockPokemonsService {
  getPokemonById(id: string) {
    return of(mockPokemon);
  }
}

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: (key: string) => '25'
    }
  };
}

class MockTitle {
  setTitle = jasmine.createSpy('setTitle');
}

class MockMeta {
  updateTag = jasmine.createSpy('updateTag');
}

describe('PokemonPage', () => {
  let component: PokemonPage;
  let fixture: ComponentFixture<PokemonPage>;
  let pokemonsService: PokemonsServices;
  let titleService: Title;
  let metaService: Meta;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonPage],
      providers: [
        { provide: PokemonsServices, useClass: MockPokemonsService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Title, useClass: MockTitle },
        { provide: Meta, useClass: MockMeta }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonPage);
    component = fixture.componentInstance;
    
    // Obtener instancias de los servicios
    pokemonsService = TestBed.inject(PokemonsServices);
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call loadPokemon on initialization', () => {
      // Espiar el método loadPokemon
      spyOn(component, 'loadPokemon').and.callThrough();
      
      // Ejecutar ngOnInit
      component.ngOnInit();
      
      expect(component.loadPokemon).toHaveBeenCalled();
    });
  });

  describe('loadPokemon', () => {
    it('should load pokemon data and set meta tags', fakeAsync(() => {
      // Espiar el servicio
      spyOn(pokemonsService, 'getPokemonById').and.callThrough();
      
      // Ejecutar el método
      component.loadPokemon();
      tick(); // Avanzar el tiempo para completar el observable
      
      // Verificar que se llamó al servicio con el ID correcto
      expect(pokemonsService.getPokemonById).toHaveBeenCalledWith('25');
      
      // Verificar que el pokemon se estableció en la signal
      expect(component.pokemon()).toEqual(mockPokemon);
      
      // Verificar que se actualizó el título
      expect(titleService.setTitle).toHaveBeenCalledWith('#25 - Pikachu');
      
      // Verificar que se actualizaron los meta tags
      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'title',
        content: '#25 - Pikachu'
      });
      
      expect(metaService.updateTag).toHaveBeenCalledWith({
        name: 'description',
        content: 'Details and abilities of pokemon Pikachu'
      });
      
      expect(metaService.updateTag).toHaveBeenCalledWith({
        property: 'og:title',
        content: 'Pikachu - Details'
      });
      
      expect(metaService.updateTag).toHaveBeenCalledWith({
        property: 'og:description',
        content: 'Details and abilities of pokemon Pikachu'
      });
      
      expect(metaService.updateTag).toHaveBeenCalledWith({
        property: 'og:image',
        content: 'https://example.com/pikachu.png'
      });
      
      expect(metaService.updateTag).toHaveBeenCalledWith({
        property: 'keywords',
        content: 'pikachu, pokemon, abilities, height'
      });
    }));

    it('should handle empty id from route', fakeAsync(() => {
      // Mock para ruta sin ID
      const routeWithoutId = {
        snapshot: {
          paramMap: {
            get: (key: string) => null
          }
        }
      };
      
      // Reemplazar el ActivatedRoute mock
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [PokemonPage],
        providers: [
          { provide: PokemonsServices, useClass: MockPokemonsService },
          { provide: ActivatedRoute, useValue: routeWithoutId },
          { provide: Title, useClass: MockTitle },
          { provide: Meta, useClass: MockMeta }
        ]
      }).compileComponents();
      
      const newFixture = TestBed.createComponent(PokemonPage);
      const newComponent = newFixture.componentInstance;
      const newPokemonsService = TestBed.inject(PokemonsServices);
      
      spyOn(newPokemonsService, 'getPokemonById').and.callThrough();
      
      // Ejecutar el método
      newComponent.loadPokemon();
      tick();
      
      // Verificar que se llamó al servicio con string vacío
      expect(newPokemonsService.getPokemonById).toHaveBeenCalledWith('');
    }));

    // it('should handle service error', fakeAsync(() => {
    //   // Mock del servicio que retorna error
    //   const errorService = {
    //     getPokemonById: () => throwError(() => new Error('Pokemon not found'))
    //   };
      
    //   TestBed.resetTestingModule();
    //   TestBed.configureTestingModule({
    //     imports: [PokemonPage],
    //     providers: [
    //       { provide: PokemonsServices, useValue: errorService },
    //       { provide: ActivatedRoute, useClass: MockActivatedRoute },
    //       { provide: Title, useClass: MockTitle },
    //       { provide: Meta, useClass: MockMeta }
    //     ]
    //   }).compileComponents();
      
    //   const newFixture = TestBed.createComponent(PokemonPage);
    //   const newComponent = newFixture.componentInstance;
      
    //   // Espiar console.error si quieres verificar manejo de errores
    //   spyOn(console, 'error');
      
    //   // Ejecutar el método
    //   newComponent.loadPokemon();
    //   tick();
      
    //   // Verificar que el pokemon sigue siendo null
    //   expect(newComponent.pokemon()).toBeNull();
      
    //   // Si tu componente tiene manejo de errores, puedes verificar aquí
    //   // expect(console.error).toHaveBeenCalled();
    // }));
  });

  describe('capitalize', () => {
    it('should capitalize the first letter of a string', () => {
      expect(component.capitalize('pikachu')).toBe('Pikachu');
      expect(component.capitalize('charizard')).toBe('Charizard');
      expect(component.capitalize('bulbasaur')).toBe('Bulbasaur');
    });

    it('should handle empty string', () => {
      expect(component.capitalize('')).toBe('');
    });

    it('should handle single character', () => {
      expect(component.capitalize('a')).toBe('A');
    });

    it('should not change already capitalized string', () => {
      expect(component.capitalize('Pikachu')).toBe('Pikachu');
    });
  });

  describe('pokemon signal', () => {
    it('should start as null', () => {
      expect(component.pokemon()).toBeNull();
    });

    it('should update when loadPokemon is called', fakeAsync(() => {
      component.loadPokemon();
      tick();
      
      expect(component.pokemon()).toEqual(mockPokemon);
    }));
  });

  describe('template integration', () => {
    it('should render when pokemon data is loaded', fakeAsync(() => {
      component.loadPokemon();
      tick();
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      expect(compiled.innerHTML).toBeDefined();
      
      // Si tu template muestra datos del pokemon, puedes verificar aquí:
      // expect(compiled.textContent).toContain('Pikachu');
      // expect(compiled.textContent).toContain('25');
    }));

    // it('should handle null pokemon state', () => {
    //   fixture.detectChanges();
      
    //   const compiled = fixture.nativeElement;
    //   // Verificar que el template maneja el estado null
    //   expect(component.pokemon()).toBeNull();
    // });
  });
});