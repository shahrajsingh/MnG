import { SearchService } from '../search.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  show: boolean = false;
  theme: boolean = true;
  constructor(
    private router: Router,
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.url;
  }

  searchfunc(form: NgForm) {
    if (form.invalid) {
      ('called');
      this.router.navigate(['/']);
      return;
    }

    let s: string = '';
    s += form.value.searchmovie;
    if (s.match(/^[0-9a-zA-Z]+$/)) {
      if (this.searchService.getpage() === 'movie') {
        this.searchService.search(s);
        this.router.navigate(['/results', s]);
      } else if (this.searchService.getpage() === 'game') {
        console.log('search game');
        this.searchService.searchgame(s);
        this.router.navigate(['/gameresults', s]);
      }
    } else {
      alert('enter vaild search queries');
    }
  }
  showbar() {
    this.show = !this.show;
    if (this.show) {
      document.getElementById('mobile-toolbar').style.display = 'flex';
    } else {
      document.getElementById('mobile-toolbar').style.display = 'none';
    }
  }
}
