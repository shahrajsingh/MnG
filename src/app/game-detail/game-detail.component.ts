import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent implements OnInit {
  videosrc: any;
  isLoading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private searchService: SearchService
  ) {}
  id;
  game;
  released = 'unknown';
  ngOnInit(): void {
    this.searchService.setpage('game');
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('gID')) {
        this.id = paramMap.get('gID');
        this.http
          .get('https://api.rawg.io/api/games/' + this.id)
          .subscribe((result) => {
            this.game = result;

            this.videosrc =
              'https://www.youtube.com/embed/' + this.game.clip.video;
            this.videosrc = this.sanitizer.bypassSecurityTrustResourceUrl(
              this.videosrc
            );
            if (this.game.released != null) {
              this.released = this.game.released;
            }
            this.game;
          });
        this.isLoading = false;
      } else {
      }
    });
  }
}
