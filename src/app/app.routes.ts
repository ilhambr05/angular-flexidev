import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './screen/page-not-found/page-not-found.component';
import { PeopleComponent } from './screen/people/people.component';

export const routes: Routes = [
    {
        path: "",
        component: PeopleComponent,
    },
    {
        path: "people",
        component: PeopleComponent,
    },
    // { path: '', redirectTo: 'people', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];
