import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  page: string = 'movies';
  search_results_changed = new Subject<{ search_results: [] }>();
  game_results_changed = new Subject();
  search_results: [];
  game_results: [];
  api_key: string = '00120c71fafa0b093f088af0f0e1ef61';
  isLoaded: boolean = false;
  constructor(private http: HttpClient) {}
  search(query: string) {
    this.http
      .get<{ results: [] }>(
        'https://api.themoviedb.org/3/search/movie?api_key=' +
          this.api_key +
          '&query=' +
          query +
          '&language=en-US&page=1&include_adult=false'
      )
      .subscribe((result) => {
        this.search_results = result.results;
        this.search_results_changed.next({
          search_results: [...this.search_results],
        });
      });
  }
  searchgame(s: string) {
    console.log('in search game');
    this.http
      .get<{ results }>('https://api.rawg.io/api/games?search=+' + s)
      .subscribe((result) => {
        this.game_results = result.results;
        console.log(this.game_results);
        this.game_results_changed.next([...this.game_results]);
      });
  }
  search_service(): Observable<{ search_results: [] }> {
    return this.search_results_changed.asObservable();
  }
  gamesearch_service() {
    return this.game_results_changed.asObservable();
  }
  setpage(x: string) {
    this.page = x;
  }
  getpage() {
    return this.page;
  }
  setloadcount() {
    this.isLoaded = true;
  }
  getloadcount() {
    return this.isLoaded;
  }
}
