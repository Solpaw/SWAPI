import { IPeopleListResponse } from './../../models/swapi.models';
import { SwapiService } from './../../services/swapi.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-character-search',
  templateUrl: './character-search.component.html',
  styleUrls: ['./character-search.component.scss']
})
export class CharacterSearchComponent implements OnInit, OnDestroy {

  people?: IPeopleListResponse;
  searchTerm = new FormControl<string>('', { nonNullable: true });
  isLoading: boolean = false;
  pageNumber: number = 0;
  sub = new Subscription();

  constructor(private swapi: SwapiService) { }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.fetchData();
    this.sub.add(this.searchTerm.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.fetchData();
      this.pageNumber = 0;
    }));
  }

  fetchData(url?: string) {
    this.isLoading = true;
    this.sub.add(this.swapi.getPeople(this.searchTerm.value, url).subscribe(res => {
      this.people = res;
      this.isLoading = false;
    }))
  }

  nextPage() {
    this.fetchData(this.people?.next);
    this.pageNumber++;
  }

  previousPage() {
    this.fetchData(this.people?.previous);
    this.pageNumber--;
  }
}
