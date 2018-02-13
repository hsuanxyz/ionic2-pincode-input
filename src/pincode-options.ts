// A function to handle a completed PIN.
// The function takes the completed PIN as a parameter,
// and returns a Promise which resolves if the PIN is valid,
// or rejects if the PIN is invalid.
export interface PincodePinHandler {
    (pin: string): Promise<any>
}
    
export interface PincodeOpt {
    title?:string,
    cancelButtonText?:string,
    hideCancelButton?:boolean,
    forgotPasswordText?:string,
    hideForgotPassword?:boolean,
    enableBackdropDismiss?:boolean,
    cssClass?:string,
    encoded?:Function,
    passSize?:number,
    hideToolbar?: boolean,
    pinHandler?: PincodePinHandler
}
