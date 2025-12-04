import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const PokemonActions = createActionGroup({
  source: 'Pokemon API',
  events: {
    'Load Pokemons': props<{ offset: number; query?: string }>(),
    'Load Pokemons Success': props<{ pokemons: any[] }>(),
    'Load Pokemons Failure': props<{ error: string }>(),

    'Load Pokemon Details': props<{ id: string | number }>(),
    'Load Pokemon Details Success': props<{ pokemon: any }>(),
    'Load Pokemon Details Failure': props<{ error: string }>(),
    
    'Clear Selected Pokemon': emptyProps(),
  },
});