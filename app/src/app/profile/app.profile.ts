import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CRUDService } from '../services/app.crud';

@Component({
  selector: 'app-profile',
  templateUrl: './app.profile.html',
  styleUrls: ['./app.profile.css']
})
export class ProfileComponent implements OnInit {
 
  selectedImg = {url:''}
  reserve={phone:"",email:"",hotel:""}
  hotel={_id:"",name:'',rate:5,address:'',price_night:15,describtion:'',extra:{information:[],features:[],images:[]}};

  changeImg(city) {
    this.selectedImg = city;
  }
  constructor(private route: ActivatedRoute,private router: Router,private crudService: CRUDService) { }
  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params =>{
        return this.crudService.get({ url:`api/hotel/${params.get('id')}`})
      })).subscribe((res: any) => {
        this.hotel = res.data[0];
        this.selectedImg=this.hotel.extra.images[0];
      });
  }
  counter(length) {
    return new Array(parseInt(length)).fill(length, 0, length);
  }

  confirmPHF(){
    this.crudService.post({
      url: 'api/reservations',
      body: { email: this.reserve.email, phone: this.reserve.phone, hotel:this.hotel._id}
    }).subscribe((res: any) => {
      alert("Your Reservation being proccessed and we will call you within 24H ");
    });
  }

}
