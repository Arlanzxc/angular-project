import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonState } from './pokemon.reducer';

export const selectPokemonState = createFeatureSelector<PokemonState>('pokemons');

export const selectAllPokemons = createSelector(
  selectPokemonState,
  (state) => state.pokemons
);
export const selectListLoading = createSelector(
  selectPokemonState,
  (state) => state.loadingList
);
export const selectListError = createSelector(
  selectPokemonState,
  (state) => state.errorList
);
export const selectCurrentOffset = createSelector(
    selectPokemonState,
    (state) => state.offset
);

export const selectSelectedPokemon = createSelector(
  selectPokemonState,
  (state) => state.selectedPokemon
);
export const selectDetailsLoading = createSelector(
  selectPokemonState,
  (state) => state.loadingDetails
);
export const selectDetailsError = createSelector(
  selectPokemonState,
  (state) => state.errorDetails
);