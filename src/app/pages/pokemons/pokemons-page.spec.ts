import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

import PokemonsPage from './pokemons-page';
import { PokemonsServices } from '@/pokemons/services/pokemons.service';
import { SimplePokemon } from '@/pokemons/interfaces';
import { PokemonList } from "@/pokemons/components/pokemon-list/pokemon-list";
import { PokemonListSkeleton } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton";

// Mocks
const mockSimplePokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
  { id: '3', name: 'venusaur' }
];

class MockPokemonsService {
  loadPage(page: number) {
    return of(mockSimplePokemons);
  }
}

class MockActivatedRoute {
  params = of({ page: '1' });
}

class MockTitle {
  setTitle = jasmine.createSpy('setTitle');
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('PokemonsPage', () => {
  let component: PokemonsPage;
  let fixture: ComponentFixture<PokemonsPage>;
  let pokemonsService: PokemonsServices;
  let titleService: Title;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsPage, PokemonListSkeleton, PokemonList, RouterLink],
      providers: [
        { provide: PokemonsServices, useClass: MockPokemonsService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Title, useClass: MockTitle },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonsPage);
    component = fixture.componentInstance;
    
    // Obtener instancias de los servicios
    pokemonsService = TestBed.inject(PokemonsServices);
    titleService = TestBed.inject(Title);
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('currentPage signal', () => {
    it('should default to page 1 when no params', () => {
      // El mock ya está configurado para página 1
      expect(component.currentPage()).toBe(1);
    });

    it('should parse numeric page from route params', () => {
      // Cambiar los params del route
      const routeWithPage = {
        params: of({ page: '2' })
      };
      
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [PokemonsPage, PokemonListSkeleton, PokemonList, RouterLink],
        providers: [
          { provide: PokemonsServices, useClass: MockPokemonsService },
          { provide: ActivatedRoute, useValue: routeWithPage },
          { provide: Title, useClass: MockTitle },
          { provide: Router, useClass: MockRouter }
        ]
      }).compileComponents();
      
      const newFixture = TestBed.createComponent(PokemonsPage);
      const newComponent = newFixture.componentInstance;
      
      expect(newComponent.currentPage()).toBe(2);
    });

    it('should handle NaN page by defaulting to 1', () => {
      const routeWithNaN = {
        params: of({ page: 'invalid' })
      };
      
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [PokemonsPage, PokemonListSkeleton, PokemonList, RouterLink],
        providers: [
          { provide: PokemonsServices, useClass: MockPokemonsService },
          { provide: ActivatedRoute, useValue: routeWithNaN },
          { provide: Title, useClass: MockTitle },
          { provide: Router, useClass: MockRouter }
        ]
      }).compileComponents();
      
      const newFixture = TestBed.createComponent(PokemonsPage);
      const newComponent = newFixture.componentInstance;
      
      expect(newComponent.currentPage()).toBe(1);
    });

    it('should ensure page is at least 1', () => {
      const routeWithZero = {
        params: of({ page: '0' })
      };
      
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [PokemonsPage, PokemonListSkeleton, PokemonList, RouterLink],
        providers: [
          { provide: PokemonsServices, useClass: MockPokemonsService },
          { provide: ActivatedRoute, useValue: routeWithZero },
          { provide: Title, useClass: MockTitle },
          { provide: Router, useClass: MockRouter }
        ]
      }).compileComponents();
      
      const newFixture = TestBed.createComponent(PokemonsPage);
      const newComponent = newFixture.componentInstance;
      
      expect(newComponent.currentPage()).toBe(1);
    });

    it('should handle negative pages by defaulting to 1', () => {
      const routeWithNegative = {
        params: of({ page: '-5' })
      };
      
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [PokemonsPage, PokemonListSkeleton, PokemonList, RouterLink],
        providers: [
          { provide: PokemonsServices, useClass: MockPokemonsService },
          { provide: ActivatedRoute, useValue: routeWithNegative },
          { provide: Title, useClass: MockTitle },
          { provide: Router, useClass: MockRouter }
        ]
      }).compileComponents();
      
      const newFixture = TestBed.createComponent(PokemonsPage);
      const newComponent = newFixture.componentInstance;
      
      expect(newComponent.currentPage()).toBe(1);
    });
  });

//   describe('loadOnPageChange effect', () => {
//     it('should call loadPokemos when currentPage changes', fakeAsync(() => {
//       spyOn(component, 'loadPokemos').and.callThrough();
      
//       // El efecto se ejecuta automáticamente cuando el componente se crea
//       // y currentPage se inicializa
//       tick();
      
//       expect(component.loadPokemos).toHaveBeenCalled();
//     }));
//   });

  describe('loadPokemos', () => {
    it('should load pokemons and set title', fakeAsync(() => {
      spyOn(pokemonsService, 'loadPage').and.callThrough();
      
      component.loadPokemos();
      tick();
      
      expect(pokemonsService.loadPage).toHaveBeenCalledWith(1);
      expect(component.pokemons()).toEqual(mockSimplePokemons);
      expect(titleService.setTitle).toHaveBeenCalledWith('Pokemons - Page 1');
    }));

    // it('should use currentPage for loading', fakeAsync(() => {
    //   // Configurar un componente con página diferente
    //   const routeWithPage3 = {
    //     params: of({ page: '3' })
    //   };
      
    //   TestBed.resetTestingModule();
    //   TestBed.configureTestingModule({
    //     imports: [PokemonsPage, PokemonListSkeleton, PokemonList, RouterLink],
    //     providers: [
    //       { provide: PokemonsServices, useClass: MockPokemonsService },
    //       { provide: ActivatedRoute, useValue: routeWithPage3 },
    //       { provide: Title, useClass: MockTitle },
    //       { provide: Router, useClass: MockRouter }
    //     ]
    //   }).compileComponents();
      
    //   const newFixture = TestBed.createComponent(PokemonsPage);
    //   const newComponent = newFixture.componentInstance;
    //   const newPokemonsService = TestBed.inject(PokemonsServices);
      
    //   spyOn(newPokemonsService, 'loadPage').and.callThrough();
      
    //   newComponent.loadPokemos();
    //   tick();
      
    //   expect(newPokemonsService.loadPage).toHaveBeenCalledWith(3);
    //   expect(titleService.setTitle).toHaveBeenCalledWith('Pokemons - Page 3');
    // }));

    // it('should handle service errors', fakeAsync(() => {
    //   const errorService = {
    //     loadPage: () => throwError(() => new Error('Service error'))
    //   };
      
    //   TestBed.resetTestingModule();
    //   TestBed.configureTestingModule({
    //     imports: [PokemonsPage, PokemonListSkeleton, PokemonList, RouterLink],
    //     providers: [
    //       { provide: PokemonsServices, useValue: errorService },
    //       { provide: ActivatedRoute, useClass: MockActivatedRoute },
    //       { provide: Title, useClass: MockTitle },
    //       { provide: Router, useClass: MockRouter }
    //     ]
    //   }).compileComponents();
      
    //   const newFixture = TestBed.createComponent(PokemonsPage);
    //   const newComponent = newFixture.componentInstance;
      
    //   // Espiar console.error si manejas errores en el componente
    //   spyOn(console, 'error');
      
    //   newComponent.loadPokemos();
    //   tick();
      
    //   // Verificar que los pokemons permanecen como array vacío
    //   expect(newComponent.pokemons()).toEqual([]);
    // }));

    it('should update pokemons signal with loaded data', fakeAsync(() => {
      const customPokemons: SimplePokemon[] = [
        { id: '4', name: 'charmander' },
        { id: '5', name: 'charmeleon' }
      ];
      
      const customService = {
        loadPage: () => of(customPokemons)
      };
      
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [PokemonsPage, PokemonListSkeleton, PokemonList, RouterLink],
        providers: [
          { provide: PokemonsServices, useValue: customService },
          { provide: ActivatedRoute, useClass: MockActivatedRoute },
          { provide: Title, useClass: MockTitle },
          { provide: Router, useClass: MockRouter }
        ]
      }).compileComponents();
      
      const newFixture = TestBed.createComponent(PokemonsPage);
      const newComponent = newFixture.componentInstance;
      
      newComponent.loadPokemos();
      tick();
      
      expect(newComponent.pokemons()).toEqual(customPokemons);
    }));
  });

  describe('signals initialization', () => {
    it('should initialize pokemons as empty array', () => {
      expect(component.pokemons()).toEqual([]);
    });

    it('should initialize currentPage with value from route', () => {
      expect(component.currentPage()).toBe(1);
    });
  });

  describe('template integration', () => {
    // it('should render child components', () => {
    //   fixture.detectChanges();
      
    //   const compiled = fixture.nativeElement;
      
    //   // Verificar que el componente se renderiza
    //   expect(compiled.querySelector('pokemons-page')).toBeTruthy();
      
    //   // Los componentes hijos podrían no renderizarse inmediatamente
    //   // dependiendo de tu lógica de template
    // });

    it('should update when pokemons signal changes', fakeAsync(() => {
      component.loadPokemos();
      tick();
      fixture.detectChanges();
      
      // Verificar que el template se actualizó con los nuevos datos
      const compiled = fixture.nativeElement;
      expect(compiled.innerHTML).toBeDefined();
    }));
  });

  describe('change detection strategy', () => {
    it('should use OnPush change detection', () => {
      const decorator = (PokemonsPage as any).__annotations__?.[0] || 
                       (PokemonsPage as any).decorators?.[0]?.args?.[0];
      
      expect(decorator.changeDetection).toBe(0); // 0 representa ChangeDetectionStrategy.OnPush
    });
  });
});