import { Component, inject } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, debounceTime, map } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PokemonCardComponent],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css'
})
export class PokemonListComponent {
  private service = inject(PokemonService);

  pokemons$ = this.service.pokemons$;
  search$ = new BehaviorSubject<string>('');

  filteredPokemons$ = combineLatest([this.pokemons$, this.search$]).pipe(
    debounceTime(250),
    map(([pokemons, search]) =>
      pokemons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    )
  );

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search$.next(input.value);
  }

  loadMore() {
    this.service.loadMorePokemons();
  }
}
