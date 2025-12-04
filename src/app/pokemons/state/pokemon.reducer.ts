import { createReducer, on } from '@ngrx/store';
import { PokemonActions } from './pokemon.actions';

export interface PokemonState {
  pokemons: any[];
  offset: number; 
  loadingList: boolean;
  errorList: string | null;
  
  selectedPokemon: any | null;
  loadingDetails: boolean;
  errorDetails: string | null;
}

export const initialState: PokemonState = {
  pokemons: [],
  offset: 0,
  loadingList: false,
  errorList: null,
  
  selectedPokemon: null,
  loadingDetails: false,
  errorDetails: null,
};

export const pokemonReducer = createReducer(
  initialState,
  
  on(PokemonActions.loadPokemons, (state) => ({
    ...state,
    loadingList: true,
    errorList: null
  })),
  on(PokemonActions.loadPokemonsSuccess, (state, { pokemons }) => ({
    ...state,
    pokemons: [...state.pokemons, ...pokemons],
    offset: state.offset + 20, 
    loadingList: false
  })),
  on(PokemonActions.loadPokemonsFailure, (state, { error }) => ({
    ...state,
    loadingList: false,
    errorList: error
  })),

  on(PokemonActions.loadPokemonDetails, (state) => ({
    ...state,
    selectedPokemon: null, 
    loadingDetails: true,
    errorDetails: null
  })),
  on(PokemonActions.loadPokemonDetailsSuccess, (state, { pokemon }) => ({
    ...state,
    selectedPokemon: pokemon,
    loadingDetails: false
  })),
  on(PokemonActions.loadPokemonDetailsFailure, (state, { error }) => ({
    ...state,
    loadingDetails: false,
    errorDetails: error
  })),
  on(PokemonActions.clearSelectedPokemon, (state) => ({
    ...state,
    selectedPokemon: null
  }))
);