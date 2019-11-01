import { Component, OnInit, Input, Output } from '@angular/core';
import { CRUDService } from '../services/app.crud';
import { CommonFunc } from '../services/common/common';

@Component({
    selector: 'app-room',
    templateUrl: './app.room.html',
    styleUrls: ['./../app.component.css']
})
export class RoomComponent implements OnInit {

    all_rooms = [];
    p: Number = 1;
    curr_room = {
        _id: '', extra: {
            images: []
        }
    }
    room_obj = {
        adults: 0, children: 0, price_night: 0, describtion: '', available: true, name: '', extra: {
            facilities: []
        }
    }
    file_obj = {
        name: 'Choose file',
        image: '',
        id: ''
    }
    h_id
    glob_user={jobTitle:''}
    constructor(private service: CRUDService,private cmn:CommonFunc, private crudService: CRUDService) { }

    ngOnInit(): void {
        // throw new Error("Method not implemented.");
        this.glob_user = JSON.parse(localStorage.getItem('current_user'));
    }

    @Input()
    set hotel_id(id) {
        this.h_id = id;
        this.getRooms(id);
    }

    getRooms(_id) {
        this.crudService.get({
            url: `api/room/hotel/${_id}`,
        }).subscribe((res: any) => {
            this.all_rooms = res.data;
        });
    }

    readFile(ele) {
        const item = ele.item(0);
        this.file_obj.name = item.name;
        this.file_obj.id = this.cmn.getRandom();

        this.cmn.getBase64(item).then(
            data => {
                this.file_obj.image = data.toString()
            }
        );
    }

    public uploadRoomImage(obj) {
        this.cmn.uploadImage(obj, res => {
            this.cmn.displayError(res, _res => this.addImageToRoom({ url: `${this.crudService.ApiUrl}/${_res.data}` }))
        });
    }
    addImageToRoom(url) {
        this.cmn.addImage({
            url: `api/room/image/${this.curr_room._id}`,
            body: {
                extra: { images: url }
            }
        }, res => this.cmn.displayError(res, _dt => {
            const eles = _dt.data[0].extra.images;
            this.curr_room.extra.images = eles;
            this.file_obj = {
                name: 'Choose file',
                image: '',
                id: ''
            }
        }))
    }
    deleteRoomImage(image) {
        this.crudService.delete({
            url: `api/room/image/${image._id}`,
        }).subscribe((res: any) => {
            this.cmn.displayError(res, _ => {
                let idx = this.curr_room.extra.images.indexOf(image);
                this.curr_room.extra.images.splice(idx, 1);
            })

        });
    }

    addRoom(room) {
        room.hotel = this.h_id;
        this.crudService.post({
            url: `api/room`,
            body: room
        }).subscribe((res: any) => {
            this.cmn.displayError(res, _dt => {
                this.all_rooms.push(_dt.data[0]);
                this.room_obj = {
                    adults: 0, children: 0, price_night: 0, describtion: '', available: true, name: '', extra: {
                        facilities: []
                    }
                }
                document.getElementById('addModal').click();
            })


        })
    }
    deleteRoom(room) {
        const confirm = window.confirm('Do you really want to remove this ?');
        if (confirm) {
            this.crudService.delete({
                url: `api/room/${room._id}`,
            }).subscribe((res: any) => {
                this.cmn.displayError(res, _ => {
                    this.all_rooms = this.all_rooms.filter(e => e._id != room._id);
                })
            });
        } else {
        }
    }
    updateRoom(room) {
        this.crudService.put({
            url: `api/room/${room._id}`,
            body: room
        }).subscribe((res: any) => {
            this.cmn.displayError(res, _ => {
                document.getElementById('editModal').click();
            })
        });
    }
}