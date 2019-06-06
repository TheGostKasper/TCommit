// Services
import { AuthenticationService } from './services/app.authentication';
import { CRUDService } from './services/app.crud';
import { CommonFunc } from './services/common/common';
import { Encryption } from './services/encryption';

// Components
import { AppComponent } from './app.component';

import { UserComponent } from './user/app.user';
import { HotelComponent } from './hotel/app.hotel'
import { ProfileComponent } from './profile/app.profile'
import { RoomComponent } from './room/app.room'
import { reservationsComponent } from './reservations/app.reservations'
import { InformationComponent } from './information/app.information'
import { ChecksComponent } from './checks/app.checks'
import { SendEmailComponent } from './sendEmail/app.sendEmail'

import { LoginComponent } from './login/app.login';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './services/interceptor';
import { DatePipe } from '@angular/common';

export class Container {
    declarations = [
        AppComponent,
        UserComponent,
        HotelComponent,
        ProfileComponent,
        InformationComponent,
        ChecksComponent,
        RoomComponent,
        reservationsComponent,
        LoginComponent,
        SendEmailComponent 
    ];
    providers = [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    }, AuthenticationService, CRUDService, CommonFunc, Encryption, DatePipe];
}
