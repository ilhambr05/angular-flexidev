import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPersonDetail } from '../../../model/people';
import { PeopleService } from '../../../services/people/people.service';
import { CommonModule } from '@angular/common';
import { LinkedItemComponent } from "../../../component/linked-item/linked-item.component";
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [CommonModule, LinkedItemComponent, TagModule, DividerModule, CardModule],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.scss'
})
export class PersonDetailComponent {
  person: IPersonDetail = {
    id : 0,
    name : "",
    height : "",
    mass : "",
    hair_color : "",
    skin_color : "",
    eye_color : "",
    birth_year : "",
    gender : "",
    homeworld : "",
    films : [],
    species : [],
    vehicles : [],
    starships : [],
    created : "",
    edited : "",
    url : ""
  };
  isLoading: boolean = false;
  isError: boolean = false;
  errorText: string = "";

  constructor(private route: ActivatedRoute, private peopleService: PeopleService) { }

  ngOnInit() {
    this.person.id = Number(this.route.snapshot.paramMap.get('id'));

    this.loadPerson(this.person.id);
  }

  loadPerson(id: number){
    if(this.person.id === 0){ return }

    this.isLoading = true;
    this.isError = false;

    this.peopleService.getById(id).subscribe(
      {
        next: (res: IPersonDetail) => {
          this.person = res;
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
}
