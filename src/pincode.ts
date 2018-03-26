import { Injectable } from '@angular/core';

import { App } from 'ionic-angular';
import { PincodeCmp } from './pincode-component';
import { isPresent, isFunction } from 'ionic-angular/util/util';
import { NavOptions } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

import { PincodeOpt } from './pincode-options'


export class PinCode extends ViewController {
  private _app: App;

  constructor(app: App, opts: PincodeOpt = {}) {
    opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ?
      !!opts.enableBackdropDismiss : true;
    opts.hideForgotPassword = isPresent(opts.hideForgotPassword) ?
      !!opts.hideForgotPassword : false;
    opts.hideCancelButton = isPresent(opts.hideCancelButton) ?
      !!opts.hideCancelButton : false;
    opts.encoded = isFunction(opts.encoded) ? opts.encoded : (c: string): string => {
      return c
    };
    opts.title = opts.title || 'Password';
    opts.cancelButtonText = opts.cancelButtonText || 'cancel';
    opts.forgotPasswordText = opts.forgotPasswordText || 'forgot password';
    opts.passSize = opts.passSize || 6;
    super(PincodeCmp, opts, null);
    this._app = app;
    //noinspection TypeScriptUnresolvedVariable
    this.isOverlay = true;
  }

  getTransitionName(direction: string) {
    let key = (direction === 'back' ? 'alertLeave' : 'alertEnter');
    //noinspection TypeScriptUnresolvedVariable
    return this._nav && this._nav.config.get(key);
  }

  setTitle(title: string) {
    //noinspection TypeScriptUnresolvedVariable
    this.data.title = title;
  }

  setCssClass(cssClass: string) {
    //noinspection TypeScriptUnresolvedVariable
    this.data.cssClass = cssClass;
  }


  present(navOptions: NavOptions = {}) {
    navOptions.minClickBlockDuration = navOptions.minClickBlockDuration || 400;
    return this._app.present(this, navOptions);
  }

}

@Injectable()
export class PincodeController {

  constructor(private _app: App) {
  }

  create(opts: PincodeOpt = {}): PinCode {
    return new PinCode(this._app, opts);
  }

}
