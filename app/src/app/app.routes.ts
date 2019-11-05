import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandpageComponent } from './landpage/app.landpage';
import { ResultsComponent } from './results/app.results';
import { ProfileComponent } from './profile/app.profile';
import { ReservationComponent } from './reservation/app.reservation';
import { ConfirmReservationComponent } from './confirmReservation/app.confirmReservation';
import { TermsComponent } from './terms/app.terms';
import { GuestsComponent } from './guests/app.guests';
import { AboutUsComponent } from './aboutUs/app.aboutUs';
import { ContactUsComponent } from './contactUs/app.contactUs';


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: LandpageComponent },
    { path: 'results', component: ResultsComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'aboutus', component: AboutUsComponent },
    { path: 'contactus', component: ContactUsComponent },
    { path: 'profile/:id', component: ProfileComponent },
    { path: 'reservation/:id', component: ReservationComponent },
    { path: 'reservation/guests/:id', component: GuestsComponent },
    { path: 'confirm/reservation/:email', component: ConfirmReservationComponent },
    // implement notfound page later
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
