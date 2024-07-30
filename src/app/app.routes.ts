import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: "",
        component: AppComponent,
    },
    // { path: '', redirectTo: 'people', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];
