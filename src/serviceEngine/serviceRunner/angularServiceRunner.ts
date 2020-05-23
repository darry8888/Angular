
import {timeout} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IServiceRunner } from './iServiceRunner';
import { IService } from '../iService';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class AngularServiceRunner implements IServiceRunner {
    constructor(private http: HttpClient) {}

    run(service: IService) {
        const config = {};
        config['headers'] = service.getHeaders();
        config['headers']['Content-Type'] = service.getContentType();
        config['observe'] = 'response';

        if (service.getMethod().toUpperCase() === 'POST') {
            this.http.post(service.url, service.getBody(), config).pipe(timeout(service.getTimeoutMs()))
                .subscribe(
                    (resp: any) => {
                        // console.log(resp);
                        if (resp.status === 200) {
                            service.onRequestResult(resp.body);
                        } else {
                            service.onRequestOther(resp.status, resp.body);
                        }
                    },
                    err => {
                        // console.log(err.status);
                        service.onRequestFail(err.status);
                    }
                );
        } else if (service.getMethod().toUpperCase() === 'GET') {
            this.http.get(service.url, config).pipe(timeout(service.getTimeoutMs()))
                .subscribe(
                    (resp: any) => {
                        // console.log(resp);
                        if (resp.status === 200) {
                            service.onRequestResult(resp.body);
                        } else {
                            service.onRequestOther(resp.status, resp.body);
                        }
                    },
                    err => {
                        // console.log(err.status);
                        service.onRequestFail(err.status);
                    }
                );
        } else if (service.getMethod().toUpperCase() === 'DELETE') {
            this.http.delete(service.url, config).pipe(timeout(service.getTimeoutMs()))
                .subscribe(
                    (resp: any) => {
                        // console.log(resp);
                        if (resp.status === 200) {
                            service.onRequestResult(resp.body);
                        } else {
                            service.onRequestOther(resp.status, resp.body);
                        }
                    },
                    err => {
                        // console.log(err.status);
                        service.onRequestFail(err.status);
                    }
            );
        }
    }
}
