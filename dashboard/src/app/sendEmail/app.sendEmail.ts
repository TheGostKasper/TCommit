import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Encryption } from '../services/encryption';
import { switchMap } from 'rxjs/operators';
import { CRUDService } from '../services/app.crud';

import * as $ from 'jquery';


@Component({
  selector: 'app-sendEmail',
  templateUrl: './app.sendEmail.html',
  styleUrls: ['./../app.component.css']
})
export class SendEmailComponent implements OnInit {

  reservation: any = {
    hotel: { rate: 5 },
    room: { extra: { facilities: [{}] } }
  }
  selectedImg = {}
  glob_user = { email: '', password: '' }
  constructor(private route: ActivatedRoute, private router: Router, private crudService: CRUDService, private encryption: Encryption) { }
  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        return this.crudService.get({ url: `api/reservations/${params.get('id')}` })
      })).subscribe((res: any) => {
        if (res.data != null) {
          this.reservation = res.data[0];
          this.selectedImg = (this.reservation.hotel) ?
            this.reservation.hotel.extra.images[0] :
            { };
        }
        else alert('Something went wrong , check up later');
      });

    this.glob_user = JSON.parse(localStorage.getItem('current_user'));

  }
  submitEmail() {
    this.crudService.post({
      url: 'api/reservtions/email',
      body: {
        fromEmail: this.glob_user.email,
        password: this.encryption.b64DecodeUnicode(this.glob_user.password),
        toEmail: this.reservation.email,
        bodyEmail: $('#bodyEmail').html()
      }
    }).subscribe((res: any) => {
      if (res.data != null)
        alert('sent Successfully');
    });
  }

  counter() {
    let length = 4;//(this.reservation.hotel)?this.reservation.hotel.rate:3;
    return new Array(length).fill(length, 0, length);
  }

}
