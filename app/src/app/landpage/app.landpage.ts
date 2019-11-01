import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/app.authentication';
import { Encryption } from '../services/encryption';
import { CRUDService } from '../services/app.crud';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
    selector: 'app-landpage',
    templateUrl: './app.landpage.html',
    styleUrls: ['./../app.component.css']
})
export class LandpageComponent implements OnInit {
    user: any = {
        email: '', password: ''
    };
    display='hide'
    srch: any = {
        hotel: '', room: 1,type: 1
    }
    visib = true
    assestsUrl = './../../assets/images/cmt'
    cities = [
        { url: `${this.assestsUrl}/squares/london.jpg`, name: 'Excel London' },
        { url: `${this.assestsUrl}/squares/2.Port de versailles.jpg`, name: 'Port De Versailles' },
        { url: `${this.assestsUrl}/squares/3.LVCC.jpg`, name: 'LVCC' },
        { url: `${this.assestsUrl}/squares/4.Amsterdam..jpg`, name: 'Amsterdam' },
        { url: `${this.assestsUrl}/squares/5.Orange Orlando.jpg`, name: 'Orange Orlando' },
        { url: `${this.assestsUrl}/squares/6.Muncchen.jpg`, name: 'München' },
        { url: `${this.assestsUrl}/squares/7.Moscone San Fransisco.jpg`, name: 'Moscone San Fransisco' },
        { url: `${this.assestsUrl}/squares/8.Messe Berlin.jpg`, name: 'Messe Berlin' },
        { url: `${this.assestsUrl}/squares/9San diego.jpg`, name: 'San diego' },
        { url: `${this.assestsUrl}/squares/10 sands las vegas.jpg`, name: 'Sands Las Vegas' },
    ]
    constructor(private authenticationService: AuthenticationService,
        private encryption: Encryption, private crudService: CRUDService, private router: Router) { }
    ngOnInit() {
    }

    manage(user) {
        const _user = { ...user };
        this.crudService.post({
            url: 'api/reservations/manage',
            body: {}
        }).subscribe((res: any) => {
        });
    }

    login(user) {
        const _user = { ...user };
        _user.password = this.encryption.b64EncodeUnicode(user.password);
        this.authenticationService.logIn(_user).subscribe((res: any) => {
            if (res.data == null) {
                alert(res.message);
            } else {
                localStorage.setItem('token', res.token);
                localStorage.setItem('current_user', JSON.stringify(res.data));
                window.location.href = '';
            }
            alert(res.message);
        });
    }

    signUp(user) {
        const _user = { ...user };
        _user.password = this.encryption.b64EncodeUnicode(user.password);
        this.authenticationService.signUp(_user).subscribe((res: any) => {
            if (res.data == null) {
                alert(res.message);
            } else {
                localStorage.setItem('token', res.token);
                localStorage.setItem('current_user', res.data);
                window.location.href = '';
            }
            alert(res.message);
        });
    }

    submitSearch(srch) {
        localStorage.setItem('dataSearch', JSON.stringify(srch));
        this.router.navigate(['/results']);

    }
    hotels = []
    
    searchHotelNames(evt) {
        if(this.srch.hotel.length>0){
            this.display='show';
            this.crudService.get({
                url: `api/hotel/searchName/${this.srch.hotel}`,
            }).subscribe((res: any) => {
                if (res.data == null) {
                    alert(res.message);
                } else {
                    this.hotels=res.data;
                    this.display='show';
                }
            });
        }else{
        this.display='hide';
        }
      
    }

    hideResults(hotel){
        this.display='hide';
        this.srch.hotel=hotel.name;
    }
}
