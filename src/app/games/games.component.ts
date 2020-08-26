import { query } from '@angular/animations';
import { MediaMatcher } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { SearchService } from '../search.service';
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  accessed: boolean = false;
  isLoading: boolean = true;
  mode: String = 'list';
  api_key = '00120c71fafa0b093f088af0f0e1ef61';
  colSize: number;
  resizeObservable: Observable<Event>;
  resizeSubscription: Subscription;
  games;
  clip = new Array();
  mobileQuery: MediaQueryList;
  tabQuery: MediaQueryList;
  desktopQuery: MediaQueryList;
  Query: MediaQueryList;
  constructor(
    private http: HttpClient,
    private media: MediaMatcher,
    private SearchService: SearchService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 689px)');
    this.Query = media.matchMedia('max-width: 1050px');
    this.tabQuery = media.matchMedia('(max-width: 1399px)');
    this.desktopQuery = media.matchMedia('(min-width: 1400px)');
    {
      if (this.mobileQuery.matches) {
        this.colSize = 1;
      } else if (this.Query.matches) {
        this.colSize = 2;
      } else if (this.tabQuery.matches) {
        this.colSize = 3;
      } else if (this.desktopQuery.matches) {
        this.colSize = 4;
      }
    }
  }

  ngOnInit(): void {
    if (!this.SearchService.getloadcount()) {
      setTimeout(() => {
        this.changestate();
        this.SearchService.setloadcount();
      }, 3000);
    } else {
      this.changestate();
    }
    this.accessed = true;
    this.resizeObservable = fromEvent(window, 'resize');
    this.resizeSubscription = this.resizeObservable.subscribe((evt) => {
      if (window.innerWidth < 689) {
        this.colSize = 1;
      } else if (window.innerWidth > 689 && window.innerWidth <= 1050) {
        this.colSize = 2;
      } else if (window.innerWidth > 1050 && window.innerWidth <= 1400) {
        this.colSize = 3;
      } else {
        this.colSize = 4;
      }
    });
    if (this.mode === 'list') {
      this.http
        .get<{ results: [] }>(
          'https://api.rawg.io/api/games?platforms=4&dates=2019-01-01,2020-12-31'
        )
        .subscribe((result) => {
          this.games = result.results;
          const len = this.games.length;

          for (let i = 0; i < len; i++) {
            if (this.games[i].clip == null) {
              this.clip.push('Error');
            } else {
              this.clip.push(this.games[i].clip.clips['320']);
            }
          }
        });
    }
  }
  changestate() {
    this.isLoading = false;
    document.getElementById('games-main').style.visibility = 'visible';
  }
}
