import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'pokemons', component: PokemonListComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
