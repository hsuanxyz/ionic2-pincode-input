export interface PincodePinHandler {
    (pin: string): boolean
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
