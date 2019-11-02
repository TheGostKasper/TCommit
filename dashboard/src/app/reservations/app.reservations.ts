import { Component, OnInit, Input, Output } from '@angular/core';
import { CRUDService } from '../services/app.crud';
import { CommonFunc } from '../services/common/common';
import { Encryption } from '../services/encryption';
import { Router } from '@angular/router';

import * as $ from 'jquery';

@Component({
    selector: 'app-reservations',
    templateUrl: './app.reservations.html',
    styleUrls: ['./../app.component.css']
})
export class reservationsComponent implements OnInit {

    all_reservations = [];
    p: Number = 1;
    curr_reservations = {
        _id: '', noRooms: 0, check_in: new Date(), check_out: new Date(), modified: true, hotelName: '', days: 0, total: 0, roomType: 1,
    }
    reservations_obj = {
        name: '', room: '', status: 'Pending', check_in: new Date(), check_out: new Date()
    }
    room_obj = {};
    curr_rooms = [];
    curr_room = { _id: '', hotel: '' }
    glob_user = { email: '', password: '' }
    reservation: any = {
        firstName: '', lastName: '', email: '', phone: '', creditcard: '', check_in: new Date(), check_out: new Date(), roomType: 1,
        conty: '', city: '', fullname: '', cvv: '', expiration: new Date(), hotelName: '', days: 0, price_night: '', noRooms: 0, total: 0
    };

    all_rooms = [];

    constructor(private cmn: CommonFunc, private crudService: CRUDService, private encryption: Encryption,private router: Router) { }

    ngOnInit(): void {
        this.getReservations();
        this.glob_user = JSON.parse(localStorage.getItem('current_user'));


        this.reservation.check_out = new Date().toISOString().split('T')[0];
        this.reservation.check_in = new Date().toISOString().split('T')[0];
    }

    openCalender() {
        $('#inputCheck_in').click();
    }
    getReservations() {
        this.crudService.get({
            url: `api/reservations`,
        }).subscribe((res: any) => {
            this.all_reservations = res.data;
        });
    }
    setNights() {
        let difSeconds = new Date(this.curr_reservations.check_in).getTime() / 1000;
        let twoSeconds = new Date(this.curr_reservations.check_out).getTime() / 1000;

        let days = (twoSeconds - difSeconds) / 86400;
        this.curr_reservations.days = days;
        this.curr_reservations.total = days * this.curr_reservations.noRooms;
    }

    deleteReservation(resvs) {
        const confirm = window.confirm('Do you really want to remove this ?');
        if (confirm) {
            this.crudService.delete({
                url: `api/reservations/${resvs._id}`,
            }).subscribe((res: any) => {
                this.cmn.displayError(res, _ => {
                    this.all_reservations = this.all_reservations.filter(e => e._id != resvs._id);
                })
            });
        } else {
        }
    }
    getDates() {


    }

    selectRoom(_this, _room) {
        this.curr_room = _room;
        $('tr.selected').not($(_this).parent()).css('background', 'rgb(255, 255, 255)');
        $(_this).parent().css('background', '#35d241');
    }
    updateReservation() {

        this.crudService.put({
            url: `api/reservations/${this.curr_reservations._id}`,
            body: { room: this.curr_room._id }
        }).subscribe((res: any) => {

        });
        $('#editModal').click();
    }
    getRooms(room) {
        this.curr_reservations = room;
        this.crudService.get({
            url: `api/room/hotel/${room.hotel._id}`,
        }).subscribe((res: any) => {
            this.curr_rooms = res.data;
        });
    }
    getAllRooms(name) {
        this.crudService.post({
            url: `api/room/search`,
            body: { name: name }
        }).subscribe((res: any) => {
            this.all_rooms = res.data;
        });
    }

    removeSpaces(rrs) {

        let cnt = rrs.email.split(' ');

        let str = '';
        for (let index = 0; index < cnt.length; index++) {
            const element = cnt[index];
            str = str.concat(element);
        }
        this.reservation.email = str;
    }
    AddRsv(rsv) {

        let difSeconds = new Date(rsv.check_in).getTime() / 1000;
        let twoSeconds = new Date(rsv.check_out).getTime() / 1000;

        let days = (twoSeconds - difSeconds) / 86400;
        rsv.days = days;
        if (this.curr_room._id != "") {
            debugger;
            rsv.room = this.curr_room._id;
            rsv.hotel = this.curr_room.hotel;
        }
        //rsv.email =this.removeSpaces(rsv) ;

        rsv.status = "Reserved";
        this.crudService.post({
            url: `api/reservations`,
            body: rsv
        }).subscribe((res: any) => {
            if (res.data != null) {
                const dt=res.data[0];
                this.all_reservations.push(dt);
               
                $('#addModal').click();
                this.reservation = {
                    firstName: '', lastName: '', email: '', phone: '', creditcard: '',
                    conty: '', city: '', fullname: '', cvv: '', expiration: new Date(), hotelName: '', days: 0, price_night: '', noRooms: 0
                };
                this.router.navigate([`/email/${dt._id}`]);
            } else {
                alert('something went wrong , try agian later');
            }
        });
    }

    Confirm(resv) {
        resv.check_in = resv.check_in.split('T')[0];
        resv.check_out = resv.check_out.split('T')[0];

        this.curr_reservations = resv;
        this.curr_reservations.total = this.curr_reservations.days * this.curr_reservations.noRooms;
    }

    calcNights() {
        let difSeconds = new Date(this.reservation.check_in).getTime() / 1000;
        let twoSeconds = new Date(this.reservation.check_out).getTime() / 1000;

        let days = (twoSeconds - difSeconds) / 86400;
        this.reservation.days = days;

        this.reservation.total = days * this.reservation.noRooms;
    }
    confirmReservation(reservation) {
        // reservation.modified=true;
        let difSeconds = new Date(reservation.check_in).getTime() / 1000;
        let twoSeconds = new Date(reservation.check_out).getTime() / 1000;

        let days = (twoSeconds - difSeconds) / 86400;
        reservation.days = days;
        this.crudService.put({
            url: `api/reservations/${reservation._id}`,
            body: {
                days: reservation.days, check_in: reservation.check_in,
                check_out: reservation.check_out, noRooms: reservation.noRooms, roomType: reservation.roomType,
                status: reservation.status, hotelName: reservation.hotelName, price_night: reservation.price_night
            }
        }).subscribe((res: any) => {
            alert("Modified Successfully ");
            $('#editModal').click();
        });
    }

}