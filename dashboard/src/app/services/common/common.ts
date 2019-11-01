import { Injectable } from '@angular/core';
import { CRUDService } from '../../services/app.crud';

@Injectable()
export class CommonFunc {
    
    constructor(private crudService: CRUDService) {

    }

    getRandom() {
        return Math.random().toString(36).substr(2, 9);
    }
    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    uploadImage(obj, callback) {
        debugger;
        this.crudService.post({
            url: `api/upload/images`,
            body: obj
        }).subscribe((res: any) => {
            callback(res);
        });
    }
    addImage(obj, callback) {
        this.crudService.post({
            url: obj.url,
            body: obj.body
        }).subscribe((res: any) => {
            callback(res);
        });
    }
    displayError(res, callback) {
        if (res.err) {
            alert('Something went wrong, try again later');
            console.log(res.err);
        }
        else {
            callback(res);
           // alert(res.message);
        }
    }
}