import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PokemonListComponent],
  template: `
    <div class="app">
      <header>
        <h1>Pokédex</h1>
      </header>

      <main>
        <app-pokemon-list></app-pokemon-list>
      </main>
    </div>
  `,
  styleUrls: ['./app.css']
})
export class App {}
