import { Component, OnInit,AfterViewInit  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CRUDService } from '../services/app.crud';
import * as $ from 'jquery';

@Component({
    selector: 'app-guests',
    templateUrl: './app.guests.html',
    styleUrls: ['./../app.component.css']
})
export class GuestsComponent implements OnInit,AfterViewInit  {
    
    reservation: any;

    gst1 = { firstName: '', lastName: '', roomNo: 0 }
    gst2 = { firstName: '', lastName: '', roomNo: 0 }

    Guests = []
    constructor(private route: ActivatedRoute, private router: Router, private crudService: CRUDService) { }
    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap(params => {
                return this.crudService.get({ url: `api/reservations/${params.get('id')}` })
            })).subscribe((res: any) => {
                if (res.data != null) {
                    this.reservation = res.data[0];
                   
                }
                else alert('Something went wrong , check up later');
            });
    }
    ngAfterViewInit(): void {
       $(document).ready(d=>{
        $(`#rm1firstName1`).val('mubo')
       })
       // this.bindGuests();
    }
    counterGuests() {
        if (this.reservation) {
            let length = this.reservation.roomType;
            return new Array(parseInt(length)).fill(length, 0, length);
            
        this.bindGuests();
        }
    }
    counter() {
        if (this.reservation) {
            let length = this.reservation.noRooms;
            return new Array(parseInt(length)).fill(length, 0, length);
        }
    }

    addToGuests(ele, room) {
        let trgt = ele.target;

        this.gst1.firstName = $(trgt).parent().parent().find(`#rm${room + 1}#firstName1`).val();
        this.gst1.lastName = $(trgt).parent().parent().find(`#rm${room + 1}#lastName1`).val();

        this.gst2.firstName = $(trgt).parent().parent().find(`#rm${room + 1}#firstName2`).val();
        this.gst2.lastName = $(trgt).parent().parent().find(`#rm${room + 1}#lastName2`).val();
        this.gst1.roomNo = this.gst2.roomNo = room + 1;

        this.Guests.push(this.gst1);
        this.Guests.push(this.gst2);

        $(trgt).css('background', 'gray');
        $(trgt).parent().parent().css('background', '#d39e003d');
    }

    bindGuests() {
        for (let index = 0; index < this.reservation.guests.length; index++) {
            const element = this.reservation.guests[index];
            $(`#rm${element.roomNo}firstName${index + 1}`).val(element.firstName);
            $(`#rm${element.roomNo}lastName${index + 1}`).val(element.lastName);
        }
        // for (let index = 0; index < parseInt(this.reservation.noRooms); index++) {
        //     for (let gst = 0; gst < this.reservation.roomType; gst++) {
        //         $(`#rm${index + 1}firstName${gst + 1}`).val('mubo');
        //         $(`#rm${index + 1}lastName${gst + 1}`).val('kjo');
        //     }
        // }
    }

    AddToDB() {
        if(confirm('Are you sure ?')){
            this.crudService.put({
                url: `api/reservations/${this.reservation._id}`,
                body: { guests: this.Guests }
            }).subscribe((res: any) => {
                this.router.navigate([``]);
                //alert("Your Reservation being proccessed and we will call you within 24H ");
            });
        }else{

        }
        
    }

}