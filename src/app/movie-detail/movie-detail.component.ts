import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}
  poster: string = 'https://source.unsplash.com/random/800x600';
  movie: any;
  video: any;
  videosrc: any;
  ngOnInit(): void {
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
            console.log(this.videosrc);
          });
      } else {
      }
    });
  }
}
