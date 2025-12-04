import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient);
  private limit = 20;

  getPokemons(offset: number = 0, query: string = ''): Observable<any[]> {
    
    const api = `https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${offset}`;

    return this.http.get<any>(api).pipe(
      map(res =>
        res.results.map((p: any, index: number) => {
          const urlParts = p.url.split('/');
          const id = urlParts[urlParts.length - 2];
          return {
            name: p.name,
            url: p.url,
            id: Number(id),
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          };
        })
      )
    );
  }

  getPokemonById(id: string | number): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return this.http.get<any>(url);
  }
}