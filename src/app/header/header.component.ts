import { SearchService } from '../search.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  show: boolean = false;
  constructor(private router: Router, private searchService: SearchService) {}

  ngOnInit(): void {}
  searchfunc(form: NgForm) {
    if (form.invalid) {
      console.log('called');
      this.router.navigate(['/']);
      return;
    }

    let s: string = '';
    s += form.value.searchmovie;
    if (s.match(/^[0-9a-zA-Z]+$/)) {
      this.searchService.search(s);
      this.router.navigate(['/results', s]);
    } else {
      alert('enter vaild search queries');
    }
  }
  showbar() {
    console.log('called00');
    this.show = !this.show;
    if (this.show) {
      document.getElementById('mobile-toolbar').style.display = 'flex';
    } else {
      document.getElementById('mobile-toolbar').style.display = 'none';
    }
  }
}
