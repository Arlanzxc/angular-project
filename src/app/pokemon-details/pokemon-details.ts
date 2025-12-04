import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, AsyncPipe, TitleCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';

import { PokemonActions } from '../pokemons/state/pokemon.actions';
import { 
  selectSelectedPokemon, 
  selectDetailsLoading, 
  selectDetailsError 
} from '../pokemons/state/pokemon.selectors';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [CommonModule, AsyncPipe, TitleCasePipe],
  templateUrl: './pokemon-details.html',
  styleUrls: ['./pokemon-details.css']
})
export class PokemonDetailsComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private store = inject(Store);


  pokemon$ = this.store.select(selectSelectedPokemon);
  loading$ = this.store.select(selectDetailsLoading);
  error$ = this.store.select(selectDetailsError);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {

      this.store.dispatch(PokemonActions.loadPokemonDetails({ id }));
    }
  }
  
  ngOnDestroy() {
    this.store.dispatch(PokemonActions.clearSelectedPokemon());
  }
}