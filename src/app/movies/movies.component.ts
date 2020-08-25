import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  mybutton = document.getElementById('myBtn');
  resultssub: Subscription;
  mobileQuery: MediaQueryList;
  tabQuery: MediaQueryList;
  desktopQuery: MediaQueryList;
  colSize: number;
  mode: string;
  isLoading: boolean = false;
  api_key = '00120c71fafa0b093f088af0f0e1ef61';
  search_results: [] = [];
  Latest_Movies: [] = [];
  Latest_movies_sub: [] = [];
  Popular_Movies: [] = [];
  Popular_Movies_sub: [] = [];
  Top_Rated_Movies: [] = [];
  Top_Rated_Movies_sub: [] = [];
  Upcoming_Movies: [] = [];
  Upcoming_Movies_sub: [] = [];
  showlatest: boolean = false;
  showtoprated: boolean = false;
  showupcoming: boolean = false;
  showpopular: boolean = false;
  search: string;

  constructor(
    private searchService: SearchService,
    private http: HttpClient,
    private route: ActivatedRoute,
    media: MediaMatcher,
    
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.tabQuery = media.matchMedia('(max-width: 1280px)');
    this.desktopQuery = media.matchMedia('(min-width: 1280px)');
    
  }
  private _mobileQueryListener: () => void;
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('query')) {
        this.mode = 'result';
        this.search = paramMap.get('query');
      } else {
        this.mode = 'list';
      }
    });
    if (this.mode == 'result') {
      this.resultssub = this.searchService.search_service().subscribe((res) => {
        this.search_results = res.search_results;
      });
    }
    if (this.mode == 'list') {
      this.isLoading = true;
      this.mainfunc();
    }
    this.checksize();
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  mainfunc() {
    this.http
      .get<{ results }>(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=' +
          this.api_key +
          '&language=en-US&page=1 '
      )
      .subscribe((result) => {
        this.Latest_Movies = result.results;

        this.pushtoarr(
          this.Latest_Movies,
          this.Latest_movies_sub,
          this.colSize
        );
      });
    this.http
      .get<{ results }>(
        'https://api.themoviedb.org/3/movie/popular?api_key=' +
          this.api_key +
          '&language=en-US&page=1'
      )
      .subscribe((result) => {
        this.Popular_Movies = result.results;
        this.pushtoarr(
          this.Popular_Movies,
          this.Popular_Movies_sub,
          this.colSize
        );
      });
    this.http
      .get<{ results }>(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=' +
          this.api_key +
          '&language=en-US&page=1'
      )
      .subscribe((result) => {
        this.Top_Rated_Movies = result.results;

        this.pushtoarr(
          this.Top_Rated_Movies,
          this.Top_Rated_Movies_sub,
          this.colSize
        );
      });

    this.http
      .get<{ results }>(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=' +
          this.api_key +
          '&language=en-US&page=1'
      )
      .subscribe((result) => {
        this.Upcoming_Movies = result.results;
        this.pushtoarr(
          this.Upcoming_Movies,
          this.Upcoming_Movies_sub,
          this.colSize
        );
        this.isLoading = false;
      });
  }
  checksize() {
    if (this.mobileQuery.matches) {
      this.colSize = 1;
    } else if (this.tabQuery.matches) {
      this.colSize = 3;
    } else if (this.desktopQuery.matches) {
      this.colSize = 4;
    }
  }
  onResize(evt: Event): void {
    const w = <Window>evt.target;
    if (w.innerWidth <= 600) {
      this.colSize = 1;
    } else if (w.innerWidth > 600 && w.innerWidth <= 1280) {
      this.colSize = 3;
    } else {
      this.colSize = 4;
    }
    this.mainfunc();
  }
  pushtoarr(arr: any, sec: any, n: number) {
    if (n == 1) {
      n = 2;
    } else if (n == 3) {
      n = 3;
    } else {
      n = 4;
    }
    for (let a = 0; a < n; a++) {
      sec.push(arr[a]);
    }
    arr.splice(0, n);
    this.sliceString(arr);
    this.sliceString(sec);
  }
  sliceString(arr: any) {
    const len = arr.length;
    for (let a = 0; a < len; a++) {
      if (arr[a].title.length > 25) {
        arr[a].title = arr[a].title.slice(0, 21) + '...';
      }
    }
  }
  show(x: number) {
    if (x == 1) {
      this.showlatest = !this.showlatest;
    } else if (x == 2) {
      this.showpopular = !this.showpopular;
    } else if (x == 3) {
      this.showtoprated = !this.showtoprated;
    } else if (x == 4) {
      this.showupcoming = !this.showupcoming;
    } else {
    }
  }
}
