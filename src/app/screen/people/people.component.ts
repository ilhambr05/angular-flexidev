import { Component, ElementRef, ViewChild } from '@angular/core';
import { IPeople, IPersonDetail } from '../../model/people';
import { PeopleService } from '../../services/people/people.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { debounceTime, Subject } from 'rxjs';
import { IServiceParams } from '../../model/service';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [RouterModule, CommonModule, TableModule, CardModule, ProgressSpinnerModule, ButtonModule, 
    PaginatorModule, TooltipModule, PersonDetailComponent, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss'
})
export class PeopleComponent {
  @ViewChild('personDetailSection') personDetailSection!: ElementRef;
  private searchSubject = new Subject<string>();
  private readonly debounceSearchTimeMs = 250;

  people: IPeople = {
    count: 0,
    next: '',
    previous: '',
    results: []
  };
  isLoading: boolean = false;
  isError: boolean = false;
  errorText: string = "";

  personDetailID: number = 0;

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.searchSubject.pipe(debounceTime(this.debounceSearchTimeMs)).subscribe((searchValue) => {
      this.doSearchPeople(searchValue);
    });

    this.loadPeople();
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  loadPeople(params?: IServiceParams) {
    const page = params?.page || 1;
    const search = params?.search || '';

    this.isLoading = true;
    this.isError = false;
    this.people.results = [];

    this.peopleService.get({ page, search }).subscribe(
      {
        next: (res: IPeople) => {
          const resultWithExtractedIDs: IPersonDetail[] = res.results.map((person: any) => {
            let urlSegments = person.url.split('/');
            let extractedID = urlSegments.pop() || urlSegments.pop();
            return {
              ...person,
              id: extractedID
            }
          })

          res.results = resultWithExtractedIDs;

          this.people = res;
        },
        error: (error: any) => {
          this.isError = true;
          this.errorText = error.message;
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      }
    )

  }

  onPageChange(event: any) {
    this.loadPeople({page: event.page + 1});
  }

  onSearchPeople(event: any) {
    this.searchSubject.next(event.target.value);
  }

  doSearchPeople(searchValue: string) {
    this.loadPeople({search: searchValue});
  }

  viewDetailPerson(id: number) {
    this.personDetailID = id;

    this.scrollToDetail();
  }

  scrollToDetail() {
    let element = this.personDetailSection?.nativeElement;

    if (element) {
      let headerOffset = 0;
      let elementPosition = element.getBoundingClientRect().top;
      let offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
