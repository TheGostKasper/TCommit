import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../services/app.crud';
import { CommonFunc } from '../services/common/common';


@Component({
    selector: 'app-hotel',
    templateUrl: './app.hotel.html',
    styleUrls: ['./../app.component.css']
})
export class HotelComponent implements OnInit {
    hotels = []
    f_hotels = []
    obj_glob = {
        name: '',
        country: '',
        city: '',
        address: '',
        location: { lat: '', lng: '' },
        price_night: 0,
        short_describtion: '',
        describtion: '',
        available: true
    }
    para_glob = {
        city: '',
        country: '',
        name: '',
        price_night: 0
    }
    curr_hotel = { _id: '', ...this.obj_glob }
    hotel = { ...this.obj_glob }

    p: Number = 1;

    constructor(private crudService: CRUDService,private cmn:CommonFunc) {
    }

    ngOnInit() {
        this.gethotels();
    }

    gethotels() {
        this.crudService.get({
            url: 'api/hotel'
        }).subscribe((res: any) => {
            this.cmn.displayError(res, _ => {
                this.hotels = res.data;
                this.f_hotels = res.data
            })

        });
    }
    addhotel(hotel) {
        const _hotel = { ...hotel };
        _hotel.created_at = new Date();
        _hotel.available = true;

        this.crudService.post({
            url: 'api/hotel',
            body: _hotel
        }).subscribe((res: any) => {
            this.cmn.displayError(res, _ => {
                console.log(res.data)
                this.f_hotels.push(res.data[0]);
                document.getElementById('cancleAddition').click();
            })

        });
    }
    updatehotel(hotel) {
        let _hotel = { ...hotel };

        _hotel.updated_at = new Date();

        this.crudService.put({
            url: `api/hotel/${_hotel._id}`,
            body: _hotel
        }).subscribe((res: any) => {
            this.cmn.displayError(res, _ => {
                document.getElementById('cancleEditable').click();
            })
        });
    }
    confirmSelection(hotel) {
        this.curr_hotel = hotel;
    }
    deletehotel() {
        this.crudService.delete({
            url: `api/hotel/${this.curr_hotel._id}`,
        }).subscribe((res: any) => {
            this.cmn.displayError(res, _ => {
                const _hotels = this.hotels;
                this.f_hotels = _hotels.filter(e => e._id != this.curr_hotel._id);
                document.getElementById('cancleModal').click();
            })

        });
    }
    gethotel(_id) {
        this.crudService.get({
            url: `api/hotel/${_id}`
        }).subscribe((res: any) => {
            this.cmn.displayError(res, _ => {

            })
        });
    }

    filterHotels() {
        let arr_filter = this.hotels;
        this.f_hotels = arr_filter;

        if (this.para_glob.name !== '')
            this.f_hotels = arr_filter.filter(sol => sol.name.includes(this.para_glob.name));
        if (this.para_glob.country !== '')
            this.f_hotels = arr_filter.filter(sol => sol.country.includes(this.para_glob.country));
        if (this.para_glob.city !== '')
            this.f_hotels = arr_filter.filter(sol => sol.city.includes(this.para_glob.city));
        if (this.para_glob.price_night !== 0 && this.para_glob.price_night !== null)
            this.f_hotels = arr_filter.filter(sol => sol.price_night === this.para_glob.price_night);
    }
}
