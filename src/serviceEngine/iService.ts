import { ServiceEngine } from './serviceEngine';

export interface IService {
    /* properties*/
    url?: string;
    token?: string;
    groupUUID?: string;
    getTimeoutMs?: () => number;
    getContentType?: () => string;
    getBody?: () => {};
    getMethod?: () => string;
    onRequestResult?: (response: any) => void; // status 200
    onRequestOther?: (statusCode: number, response: any) => void; // 200 < status < 400
    onRequestFail?: (statusCode: number) => void; // status >= 400
    getHeaders?: () => {};
}
