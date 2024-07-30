import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPersonDetail } from '../../../model/people';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [],
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

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.person.id = Number(this.route.snapshot.paramMap.get('id'));
  }
}
