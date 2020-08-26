import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private searchService: SearchService
  ) {}
  poster: string = 'https://source.unsplash.com/random/800x600';
  movie: any;
  video: any;
  videosrc: any;
  title;
  genre;
  release_date;
  ngOnInit(): void {
    this.searchService.setpage('movie');
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const api_key = '00120c71fafa0b093f088af0f0e1ef61';
      if (paramMap.has('ID')) {
        const id = paramMap.get('ID');
        this.http
          .get<{}>(
            'https://api.themoviedb.org/3/movie/' +
              id +
              '?api_key=' +
              api_key +
              '&language=en-US'
          )
          .subscribe((result: any) => {
            this.movie = result;
            this.movie.genres[0].name;
            this.title = this.movie.title;
            this.release_date = this.movie.release_date;

            this.genre = this.movie.genres[0].name;
            if (this.genre == null) {
              this.genre = 'undefined';
            }
            this.poster =
              'https://image.tmdb.org/t/p/w1280/' + this.movie.backdrop_path;
          });
        this.http
          .get<{ results: [] }>(
            'https://api.themoviedb.org/3/movie/' +
              id +
              '/videos?api_key=00120c71fafa0b093f088af0f0e1ef61&language=en-US'
          )
          .subscribe((result) => {
            this.video = result.results.pop();
            this.videosrc = 'https://www.youtube.com/embed/' + this.video.key;
            this.videosrc = this.sanitizer.bypassSecurityTrustResourceUrl(
              this.videosrc
            );
          });
      } else {
      }
    });
  }
}
