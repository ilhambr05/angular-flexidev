import { Component } from '@angular/core';
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

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [RouterModule, CommonModule, TableModule, CardModule, ProgressSpinnerModule, ButtonModule, PaginatorModule, TooltipModule, PersonDetailComponent],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss'
})
export class PeopleComponent {
  people: IPeople = {
    count: 0,
    next: '',
    previous: '',
    results: []
  };
  isLoading: boolean = false;
  isError: boolean = false;
  errorText: string = "";

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople(page = 1){
    this.isLoading = true;
    this.isError = false;
    this.people.results = [];

    this.peopleService.get({page}).subscribe(
      {
        next: (res: IPeople) => {
          const resultWithExtractedIDs : IPersonDetail[] = res.results.map((person: any) => {
            let urlSegments = person.url.split('/');
            let extractedID = urlSegments.pop() || urlSegments.pop();
            console.log(person.url, extractedID);
            return {
              ...person,
              id: extractedID
            }
          })

          res.results = resultWithExtractedIDs;

          this.people = res;
        },
        error: (error: any) => {
          // console.log(error);
          this.isError = true;
          this.errorText = error.message;
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
          console.log("complete")
        }
      }
    )

    // test.unsubscribe();

  }

  onPageChange(event : any) {
    console.log(event);
    this.loadPeople(event.page + 1);
  }
}
