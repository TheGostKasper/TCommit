import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CRUDService } from './services/app.crud';
import { Encryption } from './services/encryption';
import { TranslateService } from '@ngx-translate/core';
import { HostListener } from "@angular/core"

declare const $: any;
declare const window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token: boolean;
  user = { email: '', password: '', name: '', phone: '' };
  curr_user = { email: '', password: '', name: '', phone: '' }
  lang = "en"
  param = { value: 'world' };
  linkManage='[]'
  scrClass = "navbar navbar-expand-md navbar-dark fixed-top bg-trans";
  constructor(public location: Location, private crudService: CRUDService, private encryption: Encryption
    , private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  switchLanguage() {
    this.translate.use(this.lang);
  }
 
  ngOnInit() {
    this.token = (localStorage.getItem('Commit_token')) ? true : false;
    if (this.token) {
     this.curr_user = JSON.parse(localStorage.getItem('current_commit_user'));
     this.linkManage=`confirm/reservation/${this.curr_user.email}`;
    }
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 500) {
      this.scrClass = "navbar navbar-expand-md navbar-dark fixed-top bg-transMubte";
    } else {
      this.scrClass = "navbar navbar-expand-md navbar-dark fixed-top bg-trans";
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
        if(res.data.length>0){
          localStorage.setItem('Commit_token', JSON.stringify(res.token));
          localStorage.setItem('current_commit_user', JSON.stringify(res.data));
          this.token = true;
          window.location.href = `/confirm/reservation/${_user.email}`;
        }else{
          alert('Email or Password is incorrect');
        }

       
      }
    });
  }

  SignOut() {
    localStorage.removeItem('Commit_token');
    localStorage.removeItem('current_commit_user');
    this.token = false;
    window.location.href = '';
  }

  manage(user){
    const _user = { ...user };
    _user.password = this.encryption.b64EncodeUnicode(user.password);
    this.crudService.post({
      url: 'api/user/manage',
      body: {email:_user.email,password:_user.password}
    }).subscribe((res: any) => {
      if (res.data == null) {
        alert(res.message);
      } else {
        var dt=res.data[0];
        if(dt){
          localStorage.setItem('Commit_token',JSON.stringify(res.token));
          localStorage.setItem('current_commit_user',JSON.stringify(dt));
  
          window.location.href = `/confirm/reservation/${dt.email}`;
        }else{
          alert('Email or Password is incorrect');
        }
       
      }
    });
  }

  signUp(user) {
    const _user = { ...user };
    _user.password = this.encryption.b64EncodeUnicode(user.password);

    this.crudService.post({
      url: 'signUp',
      body: _user
    }).subscribe((res: any) => {
      if (res.data == null) {
        alert(res.message);
      } else {
        if(res.data){
          localStorage.setItem('Commit_token', res.token);
          localStorage.setItem('current_commit_user', JSON.stringify(res.data));
          this.token = true;
           window.location.href = '';
        }else{
          alert('Email or Password is incorrect');
        }
        
      }
    });
  }
}
