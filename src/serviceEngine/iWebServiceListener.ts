export interface IWebServiceListener {
    onRequestSuccess?: (entity: any) => void;
    onRequestOther?: (code: number, entity: any) => void;
    onRequestFail?: (code: number) => void;
}
