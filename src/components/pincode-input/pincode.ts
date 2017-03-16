import { Injectable } from '@angular/core';

import { App } from 'ionic-angular';
import { PincodeCmp } from './pincode-component';
import { isPresent } from 'ionic-angular/util/util';
import { NavOptions } from 'ionic-angular';
import { ViewController } from 'ionic-angular';


/**
 * @private
 */
export class PinCode extends ViewController {
  private _app: App;

  constructor(app: App, opts: any = {}) {
    opts.inputs = opts.inputs || [];
    opts.buttons = opts.buttons || [];
    opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ?
      !!opts.enableBackdropDismiss : true;

    super(PincodeCmp, opts, null);
    this._app = app;
    this.isOverlay = true;
  }

  /**
  * @private
  */
  getTransitionName(direction: string) {
    let key = (direction === 'back' ? 'alertLeave' : 'alertEnter');
    return this._nav && this._nav.config.get(key);
  }

  setTitle(title: string) {
    this.data.title = title;
  }

  setCssClass(cssClass: string) {
    this.data.cssClass = cssClass;
  }


  present(navOptions: NavOptions = {}) {
    navOptions.minClickBlockDuration = navOptions.minClickBlockDuration || 400;
    return this._app.present(this, navOptions);
  }

}

@Injectable()
export class PincodeController {

  constructor(private _app: App) {}

  create(opts: any = {}): PinCode {
    return new PinCode(this._app, opts);
  }

}
