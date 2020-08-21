import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  isLoading: boolean = false;
  api_key = '00120c71fafa0b093f088af0f0e1ef61';
  Latest_Movies: [] = [];
  Latest_movies_sub: [] = [];
  Popular_Movies: [] = [];
  Popular_Movies_sub: [] = [];
  Top_Rated_Movies: [] = [];
  Top_Rated_Movies_sub: [] = [];
  Upcoming_Movies: [] = [];
  Upcoming_Movies_sub: [] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.http
      .get<{ results }>(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=' +
          this.api_key +
          '&language=en-US&page=1 '
      )
      .subscribe((result) => {
        this.Latest_Movies = result.results;

        this.pushtoarr(this.Latest_Movies, this.Latest_movies_sub);
        console.log(this.Latest_Movies[0]);
      });
    this.http
      .get<{ results }>(
        'https://api.themoviedb.org/3/movie/popular?api_key=' +
          this.api_key +
          '&language=en-US&page=1'
      )
      .subscribe((result) => {
        this.Popular_Movies = result.results;
        this.pushtoarr(this.Popular_Movies, this.Popular_Movies_sub);
      });
    this.http
      .get<{ results }>(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=' +
          this.api_key +
          '&language=en-US&page=1'
      )
      .subscribe((result) => {
        this.Top_Rated_Movies = result.results;

        this.pushtoarr(this.Top_Rated_Movies, this.Top_Rated_Movies_sub);
      });

    this.http
      .get<{ results }>(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=' +
          this.api_key +
          '&language=en-US&page=1'
      )
      .subscribe((result) => {
        this.Upcoming_Movies = result.results;
        this.pushtoarr(this.Upcoming_Movies, this.Upcoming_Movies_sub);
        this.isLoading = false;
      });
  }
  pushtoarr(arr: [], sec: []) {
    for (let a = 0; a < 4; a++) {
      sec.push(arr[a]);
    }
    arr.splice(0, 4);
  }
}
