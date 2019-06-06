import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CRUDService } from '../services/app.crud';

@Component({
  selector: 'app-reservation',
  templateUrl: './app.reservation.html',
  styleUrls: ['./../app.component.css']
})
export class ReservationComponent implements OnInit {
  reservation:any={
    hotel:{rate:5},
    room:{extra:{facilities:[{}]}}
  }
  selectedImg = {}
  constructor(private route: ActivatedRoute, private router: Router, private crudService: CRUDService) { }
  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        return this.crudService.get({ url: `api/reservations/${params.get('id')}` })
      })).subscribe((res: any) => {
        if(res.data!=null){
          this.reservation = res.data[0];
          this.selectedImg = this.reservation.hotel.extra.images[0];
        }
        else alert('Something went wrong , check up later');
      });
  }
  confirmReservation(reservation){
    console.log(reservation);
  }

  counter() {
    let length=this.reservation.hotel.rate;
    return new Array(parseInt(length)).fill(length, 0, length);
  }
}
