import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-details.html',
  styleUrl: './pokemon-details.css'
})
export class PokemonDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(PokemonService);

  pokemon: any = null;
  types: string = '';
  abilities: string = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.service.getPokemonById(id).subscribe((data: any) => {
        this.pokemon = data;
        this.types = data.types.map((t: any) => t.type.name).join(', ');
        this.abilities = data.abilities.map((a: any) => a.ability.name).join(', ');
      });
    }
  }
}
