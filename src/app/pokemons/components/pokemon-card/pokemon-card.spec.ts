import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCard } from './pokemon-card';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '@/pokemons/interfaces';
import { By } from '@angular/platform-browser';

const mockPokemon: SimplePokemon = {
  name: 'bulbasaur',
  id: '1',
};

describe('PokemonCard', () => {
  let fixture: ComponentFixture<PokemonCard>;
  let compiled: HTMLElement;
  let component: PokemonCard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCard);
    fixture.componentRef.setInput('pokemon', mockPokemon);

    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the PokemonCard', () => {
   // console.log(compiled);

    expect(component).toBeTruthy();
  });

  it('should render "div" wrapped with css classes', () => {
    const divElement = compiled.querySelector('div');
    const divClasses = divElement?.classList.value.split(' ');
    const mustHaveClasses =
      'bg-blue-500 animate-fade-in-custom h-44 bg-opacity-25 rounded-lg shadow-md flex flex-col p-4 items-center justify-center cursor-pointer'.split(
        ' '
      );

    expect(divElement).not.toBeNull();
    mustHaveClasses.forEach((className) => {
      expect(divClasses).toContain(className);
    });
  });

  it('should render the img', () => {
    expect(compiled.querySelector('img')).not.toBeNull();
  });

  it('should have the SimplePokemon signal inputValue', () => {
    expect(component.pokemon()).toEqual(mockPokemon);
  });

  it('should compute the pokemonImage url correctly', () => {
    const expectedUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`;
    expect(component.pokemonImage()).toBe(expectedUrl);
  });

  it('should render the pokemon name and image correctly', () => {
    const imgElement = compiled.querySelector('img')!;
    expect(imgElement).toBeDefined();
    const nameElement = compiled.querySelector('h2')!;
    expect(nameElement).toBeDefined();

    expect(imgElement.getAttribute('srcset')).toBe(component.pokemonImage());
    expect(nameElement.textContent.toLowerCase()).toBe(mockPokemon.name);
  });

});
