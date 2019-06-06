import { Component, OnInit, Input, Output } from '@angular/core';
import { CRUDService } from '../services/app.crud';
import * as _ from 'lodash';
import { CommonFunc } from '../services/common/common'

@Component({
    selector: 'app-information',
    templateUrl: './app.information.html',
    styleUrls: ['./../app.component.css']
})
export class InformationComponent implements OnInit {

    all_informations = [];
    f: Number = 1;
    curr_hotel
    curr_information = {
        key: '',
        value: []
    }
    information_obj = {
        key: '',
        value: []
    }
    obj_info = { key: '', value: '', optional: [] }

    constructor(private service: CRUDService,private cmn:CommonFunc, private crudService: CRUDService) {
    }

    ngOnInit(): void {
        // throw new Error("Method not implemented.");
    }

    @Input()
    set hotel(_hotel) {
        const glob = JSON.parse(_hotel);
        this.curr_hotel = { ...glob };
        this.all_informations = glob.extra.information;
    }
    addInformation(info) {
        this.crudService.post({
            url: `api/hotel/information/${this.curr_hotel._id}`,
            body: {
                extra: { information: info }
            }
        }).subscribe((res: any) => {
            this.cmn.displayError(res, _dt => {
                const eles = _dt.data[0].extra.information;
                this.all_informations = eles;
                this.information_obj = { key: '', value: [] }
                document.getElementById('addInfoModal').click();
            });
        });
    }
    updateInformation() {
        this.crudService.put({
            url: `api/hotel/information/${this.curr_hotel._id}`,
            body: { extra: { information: this.curr_information } }
        }).subscribe((res: any) => {
            this.cmn.displayError(res, _ => {
                document.getElementById('editInfoModal').click();
            });
        });
    }
    deleteInformation(info) {
        const confirm = window.confirm('Do you really want to remove this ?');
        if (confirm) {
            this.crudService.delete({
                url: `api/hotel/information/${info._id}`,
            }).subscribe((res: any) => {
                this.cmn.displayError(res, _ => {
                    this.all_informations = this.all_informations.filter(e => e._id != info._id);
                });
            });
        } else {
        }
    }
}