import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { pokemonReducer } from './pokemons/state/pokemon.reducer';
import { PokemonEffects } from './pokemons/state/pokemon.effects';

const firebaseConfig = {
  apiKey: "AIzaSyBV-4xOa7hWrwhTbpyyQR2_G0ANCA4UutE",
  authDomain: "angular-project-d5728.firebaseapp.com",
  projectId: "angular-project-d5728",
  storageBucket: "angular-project-d5728.firebasestorage.app",
  messagingSenderId: "253121102028",
  appId: "1:253121102028:web:65367c76108ed000310269",
  measurementId: "G-0GSVEG9P14"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),

    provideStore({
      pokemons: pokemonReducer 
    }),
    provideEffects([PokemonEffects]), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ]
};