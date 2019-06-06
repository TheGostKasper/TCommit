import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CRUDService } from './services/app.crud';
import { Encryption } from './services/encryption';
import { TranslateService } from '@ngx-translate/core';


declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token: boolean;
  user = { email: '', password: '', name: '', phone: '' };
  curr_user = { email: '', password: '', name: '', phone: '' }

  param = {value: 'world'};
  
  constructor(public location: Location, private crudService: CRUDService, private encryption: Encryption
    ,private translate: TranslateService) {
      translate.setDefaultLang('en');
      translate.use('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit() {
    this.token = (localStorage.getItem('token')) ? true : false;
    if (this.token) {
      this.curr_user = JSON.parse(localStorage.getItem('current_user'))[0];
      console.log(this.curr_user)
    }
  }
 
  signIn(user) {
    const _user = { ...user };
    _user.password = this.encryption.b64EncodeUnicode(user.password);

    this.crudService.post({
      url: 'api/user/signin',
      body: _user
    }).subscribe((res: any) => {
      if (res.data == null) {
        alert(res.message);
      } else {
        localStorage.setItem('token', res.token);
        localStorage.setItem('current_user', JSON.stringify(res.data));
        this.token = true;
        //window.location.href = '';
      }
      alert(res.message);
    });
  }

  SignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('current_user');
    this.token = false;
    //window.location.href = '';
  }
  signUp(user) {
    const _user = { ...user };
    _user.password = this.encryption.b64EncodeUnicode(user.password);

    this.crudService.post({
      url: 'api/user/signup',
      body: _user
    }).subscribe((res: any) => {
      if (res.data == null) {
        alert(res.message);
      } else {
        localStorage.setItem('token', res.token);
        localStorage.setItem('current_user', JSON.stringify(res.data));
        this.token = true;
        // window.location.href = '';
      }
      alert(res.message);
    });
  }
}
