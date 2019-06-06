import { Component, OnInit, Input, Output } from '@angular/core';
import { CRUDService } from '../services/app.crud';
import { CommonFunc } from '../services/common/common';
import { Encryption } from '../services/encryption';

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
        _id: '', hotel: { _id: '' }, email: ''
    }
    reservations_obj = {
        name: '', room: '', status: 'Pending', check_in: new Date(), check_out: new Date()
    }
    room_obj = {};
    curr_rooms = [];
    curr_room = { _id: '', hotel: '' }
    glob_user = { email: '', password: '' }
    reservation: any = {
        firstName: '', lastName: '', email: '', phone: '', creditcard: '', check_in: new Date(), check_out: new Date(),
        conty: '', city: '', fullname: '', cvv: '', expiration: new Date()
    };

    all_rooms = [];
    constructor(private cmn: CommonFunc, private crudService: CRUDService, private encryption: Encryption) { }

    ngOnInit(): void {
        // throw new Error("Method not implemented.");
        this.getReservations();
        this.glob_user = JSON.parse(localStorage.getItem('current_user'));
    }

    getReservations() {
        this.crudService.get({
            url: `api/reservations`,
        }).subscribe((res: any) => {
            this.all_reservations = res.data;
        });
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
    AddRsv(rsv) {
        rsv.room = this.curr_room._id;
        rsv.hotel = this.curr_room.hotel;

        this.crudService.post({
            url: `api/reservations`,
            body: rsv
        }).subscribe((res: any) => {
            if (res.data != null) {
                this.all_reservations.push(res.data[0]);
                $('#addModal').click();

            }else{
                alert('something went wrong , try agian later');
            }
            //console.log(res.data);
        });
    }
}