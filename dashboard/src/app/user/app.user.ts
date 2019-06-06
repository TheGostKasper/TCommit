import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../services/app.crud';
import { Encryption } from '../services/encryption';
import { CommonFunc } from '../services/common/common'

@Component({
    selector: 'app-user',
    templateUrl: './app.user.html',
    styleUrls: ['./../app.component.css']
})
export class UserComponent implements OnInit {
    users = [];

    obj_glob = {
         name: '', email: '',
        password: '', phone: '', address: '',
        location: '', age: ''
    }
    curr_user = { _id: '', ...this.obj_glob }
    user = { ...this.obj_glob }

    p: Number = 1;

    constructor(private crudService: CRUDService,private cmn:CommonFunc, private encryption: Encryption) {
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.crudService.get({
            url: 'api/user'
        }).subscribe((res: any) => {
            this.cmn.displayError(res,_=>{
                this.users = res.data;
            })
        });
    }
    adduser(user) {
        const _user = { ...user };
        _user.password = this.encryption.b64EncodeUnicode(user.password);
        _user.created_at = new Date();

        this.crudService.post({
            url: 'api/user',
            body: _user
        }).subscribe((res: any) => {
            this.cmn.displayError(res,_=>{
                this.users.push(res.data);
                document.getElementById('cancleAddition').click();
            })
            
        });
    }
    updateuser(user) {
        let _user = { ...user };

        _user.updated_at = new Date();

        this.crudService.put({
            url: `api/user/${_user._id}`,
            body: _user
        }).subscribe((res: any) => {
            this.cmn.displayError(res,_=>{
                document.getElementById('cancleEditable').click();
            })
        });
    }
    confirmSelection(user) {
        this.curr_user = user;
    }
    deleteuser() {
        this.crudService.delete({
            url: `api/user/${this.curr_user._id}`,
        }).subscribe((res: any) => {
            this.cmn.displayError(res,_=>{
                const _users = this.users;
                this.users = _users.filter(e => e._id != this.curr_user._id);
                document.getElementById('cancleModal').click();
            })
        });
    }
    getuser(_id) {
        this.crudService.get({
            url: `api/user/${_id}`
        }).subscribe((res: any) => {
            this.cmn.displayError(res,_=>{})
        });
    }
}
