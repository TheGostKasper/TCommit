import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CRUDService } from '../services/app.crud';
import * as $ from 'jquery';


@Component({
  selector: 'app-confirmReservation',
  templateUrl: './app.confirmReservation.html',
  styleUrls: ['./../app.component.css']
})
export class ConfirmReservationComponent implements OnInit {
  all_reservations = [];
  p: Number = 1;
  curr_reservations = {
    _id: '', noRooms: 0, check_in: new Date(), check_out: new Date()
  }

  constructor(private route: ActivatedRoute, private router: Router, private crudService: CRUDService) { }
  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        return this.crudService.get({ url: `api/confirm/reservations/${params.get('email')}` })
      })).subscribe((res: any) => {
        if (res.data != null) {
          this.all_reservations = res.data;
        }
        else alert('Something went wrong , Enter a valid Email or Confirmation Code');
      });
  }
  confirmReservation(reservation) {
    let difSeconds = new Date(reservation.check_in).getTime() / 1000;
    let twoSeconds = new Date(reservation.check_out).getTime() / 1000;

    let days = (twoSeconds - difSeconds) / 86400;
    reservation.days = days;
    this.crudService.put({
      url: `api/reservations/${reservation._id}`,
      body: { days:reservation.days, check_in:reservation.check_in,check_out:reservation.check_out,
        noRooms:reservation.noRooms, status : "Modified"}
    }).subscribe((res: any) => {
      alert("Your Reservation being proccessed and we will call you within 24H ");
      $('#addModal').click();
    });
  }
  Confirm(resv) {
    resv.check_in = resv.check_in.split('T')[0];
    resv.check_out = resv.check_out.split('T')[0];
    this.curr_reservations = resv;
  }
}
