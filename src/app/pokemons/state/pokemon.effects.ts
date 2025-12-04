import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonActions } from './pokemon.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class PokemonEffects {
  private actions$ = inject(Actions);
  private pokemonService = inject(PokemonService);

  loadPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemons),
      mergeMap((action) =>
        this.pokemonService.getPokemons(action.offset, action.query).pipe(
          map((pokemons) => PokemonActions.loadPokemonsSuccess({ pokemons })),
          catchError((error) =>
            of(PokemonActions.loadPokemonsFailure({ error: error.message || 'Failed to load pokemons' }))
          )
        )
      )
    )
  );

  loadPokemonDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemonDetails),
      mergeMap((action) =>
        this.pokemonService.getPokemonById(action.id).pipe(
          map((pokemon) => PokemonActions.loadPokemonDetailsSuccess({ pokemon })),
          catchError((error) =>
            of(PokemonActions.loadPokemonDetailsFailure({ error: error.message || 'Failed to load details' }))
          )
        )
      )
    )
  );
}