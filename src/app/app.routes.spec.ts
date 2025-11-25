import { TestBed } from '@angular/core/testing';
import { routes } from './app.routes';
import { provideRouter, Router } from '@angular/router';
import { Location } from '@angular/common';

describe('App Routes', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should navigate to "about" redirects to "/about" route', async () => {
    // console.log(routes);
    await router.navigate(['about']);
    expect(location.path()).toBe('/about');
  });

  it('should navigate to "pokemons/page/1" redirects to "/pokemons/page/1" route', async () => {
    // console.log(routes);
    await router.navigate(['pokemons/page/1']);
    expect(location.path()).toBe('/pokemons/page/1');
  });

  it('should handle navigate to "unknown-page" redirects to "/about" route', async () => {
    // console.log(routes);
    await router.navigate(['unknown-page']);
    expect(location.path()).toBe('/about');
  });

  it('should load the proper compontent for route "about"', async () => {
    const aboutRoute = routes.find((route) => route.path === 'about')!;
    expect(aboutRoute).toBeDefined();
    expect(aboutRoute?.loadComponent).toBeDefined();

    const aboutComponent = (await aboutRoute.loadComponent!()) as any;
    expect(aboutComponent).toBeDefined();
    expect(aboutComponent.default.name).toBe('AboutPage2');
  });

  it('should load the proper compontent for route "contact"', async () => {
    const contactRoute = routes.find((route) => route.path === 'contact')!;
    expect(contactRoute).toBeDefined();
    expect(contactRoute?.loadComponent).toBeDefined();

    const contactComponent = (await contactRoute.loadComponent!()) as any;
    expect(contactComponent).toBeDefined();
    expect(contactComponent.default.name).toBe('ContactPage2');
  });

  it('should load the proper compontent for route "pricing"', async () => {
    const pricingRoute = routes.find((route) => route.path === 'pricing')!;
    expect(pricingRoute).toBeDefined();
    expect(pricingRoute?.loadComponent).toBeDefined();

    const pricingComponent = (await pricingRoute.loadComponent!()) as any;
    expect(pricingComponent).toBeDefined();
    expect(pricingComponent.default.name).toBe('PricingPage2');
  });

  it('should load the proper compontent for route "pokemons/page/1"', async () => {
    const pokemonsRoute = routes.find((route) => route.path === 'pokemons/page/:page')!;
    expect(pokemonsRoute).toBeDefined();
    expect(pokemonsRoute?.loadComponent).toBeDefined();

    const pokemonsPage = (await pokemonsRoute.loadComponent!()) as any;
    expect(pokemonsPage).toBeDefined();
    // console.log(pokemonsPage);
    expect(pokemonsPage.default.name).toBe('PokemonsPage2');
  });

  it('should load the proper compontent for route "pokemons/1"', async () => {
    const pokemonsRoute = routes.find((route) => route.path === 'pokemons/:id')!;
    expect(pokemonsRoute).toBeDefined();
    expect(pokemonsRoute?.loadComponent).toBeDefined();

    const pokemonsPage = (await pokemonsRoute.loadComponent!()) as any;
    expect(pokemonsPage).toBeDefined();
    // console.log(pokemonsPage);
    expect(pokemonsPage.default.name).toBe('PokemonPage2');
  });

  it('should load the proper compontent for route "pokemons/page/1"', async () => {
    const pokemonsRoute = routes.find((route) => route.path === 'pokemons/page/:page')!;
    expect(pokemonsRoute).toBeDefined();
    expect(pokemonsRoute?.loadComponent).toBeDefined();

    const pokemonsPage = (await pokemonsRoute.loadComponent!()) as any;
    expect(pokemonsPage).toBeDefined();
    // console.log(pokemonsPage);
    expect(pokemonsPage.default.name).toBe('PokemonsPage2');
  });

});
