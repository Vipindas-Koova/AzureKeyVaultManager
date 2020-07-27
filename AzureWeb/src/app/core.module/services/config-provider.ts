import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { map, catchError } from 'rxjs/operators';

import { BaseConstants } from '../constants';
import { resolve } from 'url';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigProvider {

    private config: any = null;

    constructor(private http: HttpClient) {
    }

    public getConfig(key: any) {
        return this.config[key];
    }

    public load() {
            return new Promise((resolve, reject) => {
                this.http.get('./assets/data/app.config.json')
                    .catch((error: any) => {
                        reject();
                        return Observable.throw(error.json().error || 'Server error');
                    })
                    .subscribe((responseData: any) => {
                        this.config = responseData.configuration;
                        BaseConstants.baseUrl = this.config.baseApiUrl;
                        BaseConstants.redirectUri = this.config.redirectUri;
                        BaseConstants.clientId = this.config.clientID;
                        BaseConstants.authority = this.config.authority;
                        resolve(true);
                    });
            });

        }
}
