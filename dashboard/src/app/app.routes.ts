import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/app.login';

import { UserComponent } from './user/app.user'
import { reservationsComponent } from './reservations/app.reservations'
import { HotelComponent } from './hotel/app.hotel'
import { ProfileComponent } from './profile/app.profile'
import { SendEmailComponent } from './sendEmail/app.sendEmail'


const routes: Routes = [
    { path: '', redirectTo: '/reservations', pathMatch: 'full' },
    { path: 'user', component: UserComponent },
    { path: 'reservations', component: reservationsComponent },
    { path: 'hotel', component: HotelComponent },
    { path: 'hotel/:id', component: ProfileComponent },
    //serviceArea
    { path: 'email/:id', component: SendEmailComponent },
    { path: 'login', component: LoginComponent },
    // implement notfound page later
    { path: '**', redirectTo: '/reservations', pathMatch: 'full' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
