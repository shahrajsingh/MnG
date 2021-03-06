import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GamesComponent } from './games/games.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  { path: '', component: MoviesComponent },
  { path: 'games', component: GamesComponent },
  { path: 'details/:ID', component: MovieDetailComponent },
  { path: 'results/:query', component: MoviesComponent },
  { path: 'gameDetail/:gID', component: GameDetailComponent },
  { path: 'gameresults/:game', component: GamesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
