import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';
import { ProfileComponent } from './profile/profile'; 
import { authGuard } from './services/auth.guard';            
export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'about', component: AboutComponent, title: 'About' },
  { path: 'pokemons', component: PokemonListComponent, title: 'Pokédex' },
  { 
    path: 'pokemon/:id', 
    component: PokemonDetailsComponent, 
    title: 'Pokemon Details' 
  },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'signup', component: SignupComponent, title: 'Sign Up' },
  { 
    path: 'profile', 
    component: ProfileComponent, 
    canActivate: [authGuard], 
    title: 'My Profile' 
  },
  { path: '**', redirectTo: '' } 
];