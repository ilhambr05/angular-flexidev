import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './screen/page-not-found/page-not-found.component';
import { PeopleComponent } from './screen/people/people.component';
import { PersonDetailComponent } from './screen/people/person-detail/person-detail.component';

export const routes: Routes = [
    {
        path: "",
        component: PeopleComponent,
    },
    {
        path: "people",
        component: PeopleComponent,
    },
    {
        path: "people/:id",
        component: PersonDetailComponent,
    },
    // { path: '', redirectTo: 'people', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];
