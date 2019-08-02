import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/app.authentication';
import { Encryption } from '../services/encryption';

@Component({
    selector: 'app-login',
    templateUrl: './app.login.html',
    styleUrls: ['./app.login.css']
})
export class LoginComponent implements OnInit {
    user: any = {
        email: '', password: '',name:''
    };
    auth=false;
    constructor(private authenticationService: AuthenticationService, private encryption: Encryption) { }
    ngOnInit() {
    }

    login(user) {
        const _user = { ...user };
        _user.email=_user.email.toLowerCase();
        _user.password = this.encryption.b64EncodeUnicode(user.password);
        this.authenticationService.logIn(_user).subscribe((res: any) => {
            if (res.data == null) {
                alert(res.message);
            } else {
                localStorage.setItem('token_dash', res.token);
                localStorage.setItem('current_user', JSON.stringify(res.data));
                 window.location.href = '';
            }
            alert(res.message);
        });
    }

    signUp(user) {
        const _user = { ...user };
        _user.type="User";
        _user.password = this.encryption.b64EncodeUnicode(user.password);
        _user.email=_user.email.toLowerCase();
        this.authenticationService.signUp(_user).subscribe((res: any) => {
            if (res.data == null) {
                alert(res.message);
                this.login(_user);
            } else {
                localStorage.setItem('token_dash', res.token);
                localStorage.setItem('current_user', res.data);
                window.location.href = '';
            }
            alert(res.message);
        });
    }
}
