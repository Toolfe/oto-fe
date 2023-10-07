import {Inject, Injectable } from '@angular/core';
import { AppSetting} from './AppSetting';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class Utilities {

 constructor(@Inject('ApiEndpoint')private ApiEndpoint: string ,
             public http: HttpClient, public appSetting: AppSetting ) {  }

    public GetPath(path: string ) {
        return this.ApiEndpoint + path;
    }

    /**
     * ConvertToJSON
     */
    public ConvertToJSON(object: string) {
        return JSON.stringify(object);
    }



}
