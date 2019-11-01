import { Component, OnInit, Input, Output } from '@angular/core';
import { CRUDService } from '../services/app.crud';
import * as _ from 'lodash';
import { CommonFunc } from '../services/common/common'

@Component({
    selector: 'app-Checks',
    templateUrl: './app.checks.html',
    styleUrls: ['./../app.component.css']
})
export class ChecksComponent implements OnInit {

    all_checks = [];
    curr_hotel
    curr_check = {
       in:'',
       out:''
    }
    check_obj = {
        check_in:'',
        check_out:''
    }

    constructor(private service: CRUDService,private cmn:CommonFunc, private crudService: CRUDService) {
    }

    ngOnInit(): void {
        // throw new Error("Method not implemented.");
    }

    @Input()
    set c_hotel(info) {
        const glob = JSON.parse(info);
        this.curr_hotel = { ...glob };
        this.all_checks = glob.extra.checks;
    }
    AddChecks(info) { 
        this.crudService.post({
            url: `api/hotel/checks/${this.curr_hotel._id}`,
            body: {
                extra: { checks: info }
            }
        }).subscribe((res: any) => {
            this.cmn.displayError(res, _dt => {
                const eles = _dt.data[0].extra.checks;
                this.all_checks = eles;
                this.check_obj = { check_in:'',check_out:'' }
                document.getElementById('addInfoModal').click();
            });
        });
    }
    updateChecks() {
        this.crudService.put({
            url: `api/hotel/checks/${this.curr_hotel._id}`,
            body: { extra: { checks: this.curr_check } }
        }).subscribe((res: any) => {
            this.cmn.displayError(res, _ => {
                document.getElementById('editInfoModal').click();
            });
        });
    }
    deleteChecks(info) {
        const confirm = window.confirm('Do you really want to remove this ?');
        if (confirm) {
            this.crudService.delete({
                url: `api/hotel/checks/${info._id}`,
            }).subscribe((res: any) => {
                this.cmn.displayError(res, _ => {
                    this.all_checks = this.all_checks.filter(e => e._id != info._id);
                });
            });
        } else {
        }
    }
}