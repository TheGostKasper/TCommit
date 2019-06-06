import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandpageComponent } from './landpage/app.landpage';
import { ResultsComponent } from './results/app.results';
import { ProfileComponent } from './profile/app.profile';
import { ReservationComponent } from './reservation/app.reservation';


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: LandpageComponent },
    { path: 'results', component: ResultsComponent },
    { path: 'profile/:id', component: ProfileComponent },
    { path: 'reservation/:id', component: ReservationComponent },
    // implement notfound page later
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
