import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { Container } from './container.modules';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng5SliderModule } from 'ng5-slider';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Services
import { AuthenticationService } from './services/app.authentication';
import { CRUDService } from './services/app.crud';
import { Encryption } from './services/encryption';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/interceptor';
import { DatePipe } from '@angular/common';
// Components
import { AppComponent } from './app.component';


import { LandpageComponent } from './landpage/app.landpage';
import { ResultsComponent } from './results/app.results';
import { ProfileComponent } from './profile/app.profile';
import { ReservationComponent } from './reservation/app.reservation';
import { GuestsComponent } from './guests/app.guests';
import { ConfirmReservationComponent } from './confirmReservation/app.confirmReservation';
import { TermsComponent } from './terms/app.terms';

import 'rxjs/add/operator/do';
//const ctr = new Container();

import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { AboutUsComponent } from './aboutUs/app.aboutUs';
import { ContactUsComponent } from './contactUs/app.contactUs';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations:  [
    AppComponent,
        LandpageComponent,
        ResultsComponent,
        ProfileComponent,
        ReservationComponent,
        GuestsComponent,
        TermsComponent,
        AboutUsComponent,
        ContactUsComponent,
        ConfirmReservationComponent
  ],
  imports: [
    NgbModule.forRoot(),
    TagInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng5SliderModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    RouterModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [RouterModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
}, AuthenticationService, CRUDService, Encryption, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
