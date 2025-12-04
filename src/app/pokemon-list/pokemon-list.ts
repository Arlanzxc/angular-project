import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { PokemonCardComponent } from '../pokemon-card/pokemon-card';
import { PokemonActions } from '../pokemons/state/pokemon.actions';
import { 
  selectAllPokemons, 
  selectListLoading, 
  selectListError, 
  selectCurrentOffset 
} from '../pokemons/state/pokemon.selectors';
import { take } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PokemonCardComponent, RouterLink, AsyncPipe],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css'
})
export class PokemonListComponent implements OnInit {
  private store = inject(Store);
  
  pokemons$ = this.store.select(selectAllPokemons);
  loading$ = this.store.select(selectListLoading);
  error$ = this.store.select(selectListError);
  offset$ = this.store.select(selectCurrentOffset);

  searchQuery = '';

  ngOnInit() {
    this.pokemons$.pipe(take(1)).subscribe(pokemons => {
      if (pokemons.length === 0) {
        this.store.dispatch(PokemonActions.loadPokemons({ offset: 0 }));
      }
    });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
  }
  
  getFilteredPokemons(pokemons: any[]) {
    if (!this.searchQuery) return pokemons;
    return pokemons.filter(p => p.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  loadMore() {
    this.offset$.pipe(take(1)).subscribe(offset => {
      this.store.dispatch(PokemonActions.loadPokemons({ offset: offset }));
    });
  }
}