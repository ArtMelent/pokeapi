import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { FavoritePokemonComponent } from './favorite-pokemon/favorite-pokemon.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { FavoriteDialogComponent } from './favorite-dialog/favorite-dialog.component';
import { HeaderComponent } from './layouts/header/header.component';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    FavoritePokemonComponent,
    PokemonDetailsComponent,
    FavoriteDialogComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    HttpClientModule,
    NgxPaginationModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
    
    
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }