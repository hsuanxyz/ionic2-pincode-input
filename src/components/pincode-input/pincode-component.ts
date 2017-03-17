import { Component, ElementRef, Renderer, ViewEncapsulation, trigger, state, animate, transition, style } from '@angular/core';

import { Config } from 'ionic-angular/config/config';
import { GestureController, BlockerDelegate, BLOCK_ALL ,ViewController,Platform,NavOptions,NavParams} from 'ionic-angular';
import { assert } from 'ionic-angular/util/util';

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
  template:
    '<ion-backdrop (click)="bdClick()" [class.backdrop-no-tappable]="!d.enableBackdropDismiss"></ion-backdrop>' +
    '<div class="pincode-wrapper"  [@openClose]="stateExpression">' +

    '   <div class="pincode-toolbar"> ' +
    '     <button ion-button clear>{{d.cancelButtonText}}</button>' +
    '      <div class="pincode-title">{{d.title}}</div>' +
    '   </div>' +

    '   <div class="pincode-input">' +
    '     <ion-grid class="pincode-input-grid">' +
    '       <ion-row class="pincode-input-row">' +
    '         <ion-col style="border-left: 0;"><span class="on"></span></ion-col>' +
    '         <ion-col></ion-col>' +
    '         <ion-col></ion-col>' +
    '         <ion-col></ion-col>' +
    '         <ion-col></ion-col>' +
    '         <ion-col></ion-col>' +
    '       </ion-row>' +
    '     </ion-grid>' +
    '   </div>' +

    '   <div class="pincode-button-wrapper">' +
    '     <ion-grid> ' +
    '       <ion-row> ' +
    '         <ion-col><button ion-button color="light">1</button></ion-col>' +
    '         <ion-col><button ion-button color="light">2</button></ion-col>' +
    '         <ion-col><button ion-button color="light">3</button></ion-col>' +
    '       </ion-row>' +
    '       <ion-row> ' +
    '         <ion-col><button ion-button color="light">4</button></ion-col>' +
    '         <ion-col><button ion-button color="light">5</button></ion-col>' +
    '         <ion-col><button ion-button color="light">6</button></ion-col>' +
    '       </ion-row>' +
    '       <ion-row> ' +
    '         <ion-col><button ion-button color="light">7</button></ion-col>' +
    '         <ion-col><button ion-button color="light">8</button></ion-col>' +
    '         <ion-col><button ion-button color="light">9</button></ion-col>' +
    '       </ion-row>' +
    '       <ion-row> ' +
    '         <ion-col><button ion-button color="light" icon-only><ion-icon name="ios-refresh"></ion-icon></button></ion-col>' +
    '         <ion-col><button ion-button color="light">0</button></ion-col>' +
    '         <ion-col><button ion-button color="light" icon-only><ion-icon name="ios-backspace"></ion-icon></button></ion-col>' +
    '       </ion-row>' +
    '     </ion-grid>' +
    '   </div>' +
    '</div>',
  host: {
    'role': 'dialog',
    '[attr.aria-labelledby]': 'hdrId',
    '[attr.aria-describedby]': 'descId'
  },
  encapsulation: ViewEncapsulation.None,
})
export class PincodeCmp {
  descId: string;
  autoInterval:any;
  stateExpression:string  = 'off';
  d: {
    cssClass?: string;
    title?: string;
    enableBackdropDismiss?: boolean;
    cancelButtonText?:string;
    forgotPasswordText?:string;
    hideForgotPassword?:boolean;
  };
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

    console.log(this.d)

    this.mode = config.get('mode');
    _renderer.setElementClass(_elementRef.nativeElement, `pincode-${this.mode}`, true);

    if (this.d.cssClass) {
      this.d.cssClass.split(' ').forEach(cssClass => {
        if (cssClass.trim() !== '') _renderer.setElementClass(_elementRef.nativeElement, cssClass, true);
      });
    }

  }

  ionViewDidLoad() {
    // normalize the data
    this.stateExpression = 'on';
    const data = this.d;
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



  btnClick(button: any) {
    clearInterval(this.autoInterval);

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


  bdClick() {
    if (this.enabled && this.d.enableBackdropDismiss) {
      this.dismiss('backdrop');
    }
  }

  dismiss(role: any): Promise<any> {
    this.stateExpression = 'off';

    const opts: NavOptions = {
      minClickBlockDuration: 400
    };
    return this._viewCtrl.dismiss(this.getValues(), role, opts);
  }

  getValues(): any {

    let values = '';
    return values;
  }

  ngOnDestroy() {
    assert(this.gestureBlocker.blocked === false, 'gesture blocker must be already unblocked');
    this.gestureBlocker.destroy();
  }
}

