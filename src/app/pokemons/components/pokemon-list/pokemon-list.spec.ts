import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonList } from './pokemon-list';
import { SimplePokemon } from '@/pokemons/interfaces';
import { provideRouter } from '@angular/router';

const mockPokemonList: SimplePokemon[] = [
  { name: 'bulbasaur', id: '1' },
  { name: 'ivysaur', id: '2' },
  { name: 'venusaur', id: '3' },
  { name: 'charmander', id: '4' },
  { name: 'charmeleon', id: '5' },
  { name: 'charizard', id: '6' },
  { name: 'squirtle', id: '7' },
  { name: 'wartortle', id: '8' },
  { name: 'blastoise', id: '9' },
  { name: 'caterpie', id: '10' },
];

describe('PokemonList', () => {
  let fixture: ComponentFixture<PokemonList>;
  let compiled: HTMLElement;
  let component: PokemonList;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonList);
    //fixture.componentRef.setInput('pokemons', []);

    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the PokemonList', () => {
    fixture.componentRef.setInput('pokemons', mockPokemonList);
    fixture.detectChanges();
    // console.log(compiled);
    //const fixture = TestBed.createComponent(Component);
    // const calculatorView = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have the SimplePokemon[] signal inputValue', () => {
    fixture.componentRef.setInput('pokemons', mockPokemonList);
    fixture.detectChanges();
    expect(component.pokemons()).toEqual(mockPokemonList);
  });

  it('should render the correct number of pokemon-card components', () => {
    fixture.componentRef.setInput('pokemons', mockPokemonList);
    fixture.detectChanges();
    const pokemonCardElements = compiled.querySelectorAll('pokemon-card');
    expect(pokemonCardElements.length).toBe(mockPokemonList.length);
  });

  it('should render a message when the pokemons list is empty', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    const messageElement = compiled.querySelector('div');
    expect(messageElement).not.toBeNull();
    expect(messageElement?.textContent).toContain("There's no pokemons to show.");
  });
});
