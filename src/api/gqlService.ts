import { Injectable } from '@angular/core';
import { IService } from '../serviceEngine/iService';
import { IWebServiceListener } from '../serviceEngine/iWebServiceListener';
/*
    gql
*/
@Injectable()
export class GqlService implements IService {
    path = '/graphql';
    url: string;

    constructor(private listener: IWebServiceListener) {
        this.url = 'http://localhost:3000' + this.path;
    }
    getTimeoutMs() {
        return 15000;
    }
    getContentType() {
        return 'application/json; charset=utf-8';
    }
    getMethod() {
        return 'POST';
    }
    getBody() {
        return {
            query: `
                query allCourse{
                    helloWorld
                }
                `
        };
    }
    getHeaders() {
        const headers = {};
        headers['Accept'] = this.getContentType();
        return headers;
    }
    onRequestResult(response: any) {
        this.listener.onRequestSuccess(response);
    }
    onRequestOther(statusCode: number, response: any) {
        this.listener.onRequestOther(statusCode, response);
    }
    onRequestFail(statusCode: number) {
        this.listener.onRequestFail(statusCode);
        /*
        419	請帶入完整參數
        428	相關設定有誤
        500	伺服器發生錯誤!
        */
    }
}
