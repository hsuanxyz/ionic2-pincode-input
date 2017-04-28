import { Component, ElementRef, Renderer, ViewEncapsulation, trigger, state, animate, transition, style } from '@angular/core';

import {GestureController, BlockerDelegate, BLOCK_ALL, ViewController, Platform, NavOptions, NavParams, Config} from 'ionic-angular';
import {assert, isNumber} from "ionic-angular/util/util";

/**
 * @private
 */
@Component({
  selector: 'ion-pincode',
  animations: [
    trigger('openClose', [
      state('off, void', style({bottom: '-295px'})),
      state('on', style({bottom:'0'})),
      transition(
        'on <=> off', [animate("400ms cubic-bezier(.36,.66,.04,1)")])
    ])
  ],
  templateUrl: './pincode-component.html',
  styleUrls:['./pincode-component.scss'],
  host: {
    'role': 'dialog',
    '[attr.aria-labelledby]': 'hdrId',
    '[attr.aria-describedby]': 'descId'
  },
  encapsulation: ViewEncapsulation.None,
})
export class PincodeCmp {
  descId: string;
  stateExpression:string  = 'off';
  d: {
    cssClass?: string;
    title?: string;
    enableBackdropDismiss?: boolean;
    cancelButtonText?:string;
    hideCancelButton?:boolean;
    forgotPasswordText?:string;
    hideForgotPassword?:boolean;
    encoded?:Function;
  };
  codeArr:Array<number> = [];
  maxLen : number = 6;
  enabled: boolean;
  hdrId: string;
  id: number;
  lastClick: number;
  mode: string;
  gestureBlocker: BlockerDelegate;

  constructor(
    public _viewCtrl: ViewController,
    public _elementRef: ElementRef,
    config: Config,
    gestureCtrl: GestureController,
    params: NavParams,
    private _renderer: Renderer,
    private _plt: Platform
  ) {
    this.gestureBlocker = gestureCtrl.createBlocker(BLOCK_ALL);
    this.d = params.data;

    this.mode = config.get('mode');
    _renderer.setElementClass(_elementRef.nativeElement, `pincode-${this.mode}`, true);

    if (this.d.cssClass) {
      this.d.cssClass.split(' ').forEach(cssClass => {
        if (cssClass.trim() !== '') _renderer.setElementClass(_elementRef.nativeElement, cssClass, true);
      });
    }

  }

  ionViewDidLoad() {
    this.stateExpression = 'on';
  }

  ionViewWillEnter() {
    this.gestureBlocker.block();
  }

  ionViewDidLeave() {
    this._plt.focusOutActiveElement();
    this.gestureBlocker.unblock();
  }

  ionViewWillLeave() {
    this._plt.focusOutActiveElement();
  }

  ionViewDidEnter() {
    this._plt.focusOutActiveElement();
    this.enabled = true;
  }

  numClick(num:number){
    if(num < 0 || num > 9) return;

    if(this.codeArr.length < this.maxLen -1){
      this.codeArr.push(num);
    }else if(this.codeArr.length === this.maxLen -1){
      this.codeArr.push(num);
      this.dismiss('done')
    }
  }

  delClick(){
    this.codeArr.pop()
  }

  restoreClick(){
    this.codeArr = [];
  }

  btnClick(button: any) {

    if (!this.enabled) {
      return;
    }

    // keep the time of the most recent button click
    this.lastClick = Date.now();

    let shouldDismiss = true;

    if (button.handler) {
      // a handler has been provided, execute it
      // pass the handler the values from the inputs
      if (button.handler(this.getValues()) === false) {
        // if the return value of the handler is false then do not dismiss
        shouldDismiss = false;
      }
    }

    if (shouldDismiss) {
      this.dismiss(button.role).catch(() => {
        console.debug('alert can not be dismissed');
      });
    }
  }

  isNum(num:any): boolean{
    if(isNumber(num)){
      return num <= 9 || num >= 0;
    }else {
      return false
    }
  }


  bdClick() {
    if (this.enabled && this.d.enableBackdropDismiss) {
      this.dismiss('backdrop');
    }
  }

  cancelClick(){
    this.dismiss('cancel');
  }

  forgotClick(){
    this.dismiss('forgot');
  }

  dismiss(role: any): Promise<any> {
    this.stateExpression = 'off';

    const opts: NavOptions = {
      minClickBlockDuration: 400
    };
    return this._viewCtrl.dismiss(this.getValues(), role, opts);
  }

  getValues(): string {

    let values:string = '';
    this.codeArr.forEach( (e) => {
      values += e.toString();
    });

    return this.d.encoded(values);
  }

  ngOnDestroy() {
    assert(this.gestureBlocker.blocked === false, 'gesture blocker must be already unblocked');
    this.gestureBlocker.destroy();
  }
}
