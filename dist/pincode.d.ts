import { App } from 'ionic-angular';
import { NavOptions } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { PincodeOpt } from './pincode-options';
/**
 * @private
 */
export declare class PinCode extends ViewController {
    private _app;
    constructor(app: App, opts?: PincodeOpt);
    /**
    * @private
    */
    getTransitionName(direction: string): any;
    setTitle(title: string): void;
    setCssClass(cssClass: string): void;
    present(navOptions?: NavOptions): Promise<any>;
}
export declare class PincodeController {
    private _app;
    constructor(_app: App);
    create(opts?: PincodeOpt): PinCode;
}
