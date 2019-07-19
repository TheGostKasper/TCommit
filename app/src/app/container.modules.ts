// Services
import { AuthenticationService } from './services/app.authentication';
import { CRUDService } from './services/app.crud';
import { Encryption } from './services/encryption';

// Components
import { AppComponent } from './app.component';


import { LandpageComponent } from './landpage/app.landpage';
import { ResultsComponent } from './results/app.results';
import { ProfileComponent } from './profile/app.profile';
import { ReservationComponent } from './reservation/app.reservation';
import { ConfirmReservationComponent } from './confirmReservation/app.confirmReservation';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './services/interceptor';
import { DatePipe } from '@angular/common';

export class Container {
    declarations = [
        AppComponent,
        LandpageComponent,
        ResultsComponent,
        ProfileComponent,
        ReservationComponent,
        ConfirmReservationComponent
    ];
    providers = [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    }, AuthenticationService, CRUDService, Encryption, DatePipe];
}
