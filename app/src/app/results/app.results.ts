import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { CRUDService } from '../services/app.crud';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './app.results.html',
  styleUrls: ['./app.results.css']
})
export class ResultsComponent implements OnInit {
  minValue: number = 800;maxValue: number = 1200; currResv={_id:""};rate: number = 3;
  srch_name = '';hotelSearch='';page = 1;_counter = 1;hotels = [];

  options: Options = {
    floor: 0,ceil: 5000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min:</b> $' + value;
        case LabelType.High:
          return '<b>Max:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };

  

  
  rateOptions: Options = {
    floor: 0,ceil: 5,step: 1,showTicks: true,showTicksValues: true
  };

  reserve={phone:"",email:"",hotel:""}
  
  
  constructor(private crudService: CRUDService, private router: Router) { }
  
  ngOnInit() {

    let srch = JSON.parse(localStorage.getItem('dataSearch'));



    this.crudService.post({
      url: 'api/hotel/search',
      body: { hotel: srch.hotel, page: this.page, pageCount: 100}
    }).subscribe((res: any) => {
      this.hotels = res.data;
    });

    this.counter(5);
  }

  SearchNames( page?) {
    this._counter = (page && page > 0) ? this._counter++ : this._counter--;
    this.page = this._counter;

    this.crudService.post({
      url: 'api/hotel/names',
      body: { hotel: this.hotelSearch, page: this.page, pageCount: 100, p_from: this.minValue, p_to: this.maxValue, rate: this.rate }
    }).subscribe((res: any) => {
      this.hotels = res.data;
    });
  }

  confirmPHF(){
    this.crudService.post({
      url: 'api/reservations',
      body: { email: this.reserve.email, phone: this.reserve.phone, hotel:this.currResv._id}
    }).subscribe((res: any) => {
      alert("Your Reservation being proccessed and we will call you within 24H ");
    });
  }
  counter(length) {
    return new Array(parseInt(length)).fill(length, 0, length);
  }

}
