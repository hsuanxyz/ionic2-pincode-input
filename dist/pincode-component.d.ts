import { ElementRef, Renderer } from '@angular/core';
import { GestureController, BlockerDelegate, ViewController, Platform, NavParams, Config } from 'ionic-angular';
import { PincodeOpt } from './pincode-options';
/**
 * @private
 */
export declare class PincodeCmp {
    _viewCtrl: ViewController;
    _elementRef: ElementRef;
    private _renderer;
    private _plt;
    descId: string;
    stateExpression: string;
    d: PincodeOpt;
    codeArr: Array<number>;
    maxLen: number;
    enabled: boolean;
    hdrId: string;
    id: number;
    lastClick: number;
    mode: string;
    gestureBlocker: BlockerDelegate;
    constructor(_viewCtrl: ViewController, _elementRef: ElementRef, config: Config, gestureCtrl: GestureController, params: NavParams, _renderer: Renderer, _plt: Platform);
    ionViewDidLoad(): void;
    ionViewWillEnter(): void;
    ionViewDidLeave(): void;
    ionViewWillLeave(): void;
    ionViewDidEnter(): void;
    numClick(num: number): void;
    delClick(): void;
    restoreClick(): void;
    btnClick(button: any): void;
    isNum(num: any): boolean;
    bdClick(): void;
    cancelClick(): void;
    forgotClick(): void;
    dismiss(role: any): Promise<any>;
    getValues(): string;
    ngOnDestroy(): void;
}
