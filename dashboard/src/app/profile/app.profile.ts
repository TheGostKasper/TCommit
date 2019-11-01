import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../services/app.crud';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CommonFunc } from '../services/common/common'



@Component({
    selector: 'app-hotel',
    templateUrl: './app.profile.html',
    styleUrls: ['./../app.component.css']
})
export class ProfileComponent implements OnInit {
    obj_glob = {
        name: '',
        country: '',
        city: '',
        address: '',
        location: { lat: '', lng: '' },
        price_night: 0,
        rate: 0,
        short_describtion: '',
        describtion: '',
        available: true,
        extra: {
            information: [],
            features: [],
            images: [],
            rooms: [],
            checks:[]
        }
    }
    f_obj = { name: '' }
    curr_hotel = { ...this.obj_glob }
    file_obj = {
        name: 'Choose file',
        image: '',
        id: ''
    }

    hotel;
    showRoom = false;
    chech={
        in:Date.now(),
        out:Date.now()
    }
    constructor(private service: CRUDService, private route: ActivatedRoute,
        private crudService: CRUDService, private cmn: CommonFunc) { }
    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.service.get({ url: `api/hotel/${params.get('id')}` })
            )).subscribe((res: any) => {
                let rs = res.data[0];
                this.curr_hotel = { ...rs };
                this.hotel = { ...rs };
            });
    }

    UpdateHotel(obj) {
        this.crudService.put({
            url: `api/hotel/${this.hotel._id}`,
            body: obj
        }).subscribe((res: any) => {
            this.cmn.displayError(res, _ => {
                alert('Updated successfully');
             })
        });
    }
    uploadImage(obj) {
        this.cmn.uploadImage(obj, res => {
            this.cmn.displayError(res, _res => this.addImage({ url: `${this.crudService.ApiUrl}/${_res.data}` }))
        });
    }

    addImage(url) {
        this.cmn.addImage({
            url: `api/hotel/image/${this.hotel._id}`,
            body: {
                extra: { images: url }
            }
        }, res => this.cmn.displayError(res, _dt => {
            const eles = _dt.data[0].extra.images;
            this.curr_hotel.extra.images = eles;
            this.file_obj = {
                name: 'Choose file',
                image: '',
                id: ''
            }
        }))
    }

    updateImages() {
        this.crudService.put({
            url: `api/hotel/image/${this.hotel._id}`,
            body: { extra: { images: this.hotel.extra.images } }
        }).subscribe((res: any) => {
            this.cmn.displayError(res, _ => { })
        });
    }
    deleteImage(image) {
        const confirm = window.confirm('Do you really want to remove this ?');
        if (confirm) {
            this.crudService.delete({
                url: `api/hotel/image/${image._id}`,
            }).subscribe((res: any) => {
                this.cmn.displayError(res, _ => {
                    this.curr_hotel.extra.images = this.curr_hotel.extra.images.filter(e => e._id != image._id);
                })
            });
        } else {
        }
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
}
