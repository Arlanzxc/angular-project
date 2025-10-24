import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient);
  private _pokemons$ = new BehaviorSubject<any[]>([]);
  private _error$ = new BehaviorSubject<string | null>(null);
  private _nextUrl: string | null = 'https://pokeapi.co/api/v2/pokemon?limit=400';

  pokemons$ = this._pokemons$.asObservable();
  error$ = this._error$.asObservable();

  constructor() {
    this.loadPokemons();
  }

  loadPokemons() {
    if (!this._nextUrl) return;

    this.http.get<any>(this._nextUrl).pipe(
      map(res => {
        this._nextUrl = res.next;

        return res.results.map((p: any) => ({
          name: p.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.extractId(p.url)}.png`
        }));
      }),
      catchError(err => {
        this._error$.next('Failed to load Pokémon.');
        return of([]);
      })
    ).subscribe(newPokemons => {
      const current = this._pokemons$.value;
      this._pokemons$.next([...current, ...newPokemons]);
    });
  }

  private extractId(url: string): number {
    const parts = url.split('/');
    return +parts[parts.length - 2];
  }
}
