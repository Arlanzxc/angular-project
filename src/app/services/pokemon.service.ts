import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient);

  private _pokemons$ = new BehaviorSubject<any[]>([]);
  pokemons$ = this._pokemons$.asObservable();

  private _error$ = new BehaviorSubject<string | null>(null);
  error$ = this._error$.asObservable();

  private limit = 20;
  private offset = 0;

  constructor() {
    this.loadMorePokemons();
  }

  loadMorePokemons() {
    const api = `https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`;

    this.http.get<any>(api).pipe(
      map(res =>
        res.results.map((p: any, index: number) => ({
          name: p.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.offset + index + 1}.png`
        }))
      ),
      catchError(err => {
        this._error$.next('Failed to load Pokémon');
        return of([]);
      })
    ).subscribe(newPokemons => {
      const current = this._pokemons$.value;
      this._pokemons$.next([...current, ...newPokemons]);
      this.offset += this.limit;
    });
  }

  getPokemonById(id: string | number) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return this.http.get<any>(url).pipe(
    catchError(err => {
      this._error$.next('Failed to load Pokémon details.');
      return of(null);
    })
  );
}

}
// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, catchError, map, of, switchMap } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class PokemonService {
//   private http = inject(HttpClient);
//   private _pokemons$ = new BehaviorSubject<any[]>([]);
//   private _error$ = new BehaviorSubject<string | null>(null);
//   private _nextUrl: string | null = 'https://pokeapi.co/api/v2/pokemon?limit=50';

//   pokemons$ = this._pokemons$.asObservable();
//   error$ = this._error$.asObservable();

//   constructor() {
//     this.loadPokemons();
//   }

//   loadPokemons() {
//     if (!this._nextUrl) return;

//     this.http.get<any>(this._nextUrl).pipe(
//       map(res => {
//         this._nextUrl = res.next;

//         return res.results.map((p: any) => ({
//           name: p.name,
//           image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.extractId(p.url)}.png'
//         }));
//       }),
//       catchError(err => {
//         this._error$.next('Failed to load Pokémon.');
//         return of([]);
//       })
//     ).subscribe(newPokemons => {
//       const current = this._pokemons$.value;
//       this._pokemons$.next([...current, ...newPokemons]);
//     });
//   }

//   private extractId(url: string): number {
//     const parts = url.split('/');
//     return +parts[parts.length - 2];
//   }
// }