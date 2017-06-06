import { Component, ElementRef, Renderer, ViewEncapsulation, trigger, state, animate, transition, style } from '@angular/core';
import { GestureController, BLOCK_ALL, ViewController, Platform, NavParams, Config } from 'ionic-angular';
import { assert, isNumber } from "ionic-angular/util/util";
/**
 * @private
 */
export var PincodeCmp = (function () {
    function PincodeCmp(_viewCtrl, _elementRef, config, gestureCtrl, params, _renderer, _plt) {
        this._viewCtrl = _viewCtrl;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._plt = _plt;
        this.stateExpression = 'off';
        this.codeArr = [];
        this.maxLen = 6;
        this.gestureBlocker = gestureCtrl.createBlocker(BLOCK_ALL);
        this.d = params.data;
        this.d.passSize && (this.maxLen = this.d.passSize);
        this.codeArr = new Array(this.maxLen);
        this.codeArr.fill(null);
        this.mode = config.get('mode');
        _renderer.setElementClass(_elementRef.nativeElement, "pincode-" + this.mode, true);
        if (this.d.cssClass) {
            this.d.cssClass.split(' ').forEach(function (cssClass) {
                if (cssClass.trim() !== '')
                    _renderer.setElementClass(_elementRef.nativeElement, cssClass, true);
            });
        }
    }
    PincodeCmp.prototype.ionViewDidLoad = function () {
        this.stateExpression = 'on';
    };
    PincodeCmp.prototype.ionViewWillEnter = function () {
        this.gestureBlocker.block();
    };
    PincodeCmp.prototype.ionViewDidLeave = function () {
        this._plt.focusOutActiveElement();
        this.gestureBlocker.unblock();
    };
    PincodeCmp.prototype.ionViewWillLeave = function () {
        this._plt.focusOutActiveElement();
    };
    PincodeCmp.prototype.ionViewDidEnter = function () {
        this._plt.focusOutActiveElement();
        this.enabled = true;
    };
    PincodeCmp.prototype.numClick = function (num) {
        if (num < 0 || num > 9)
            return;
        var emptyIndex = this.codeArr.indexOf(null);
        if (emptyIndex < this.maxLen - 1) {
            this.codeArr[emptyIndex] = num;
        }
        else if (emptyIndex === this.maxLen - 1) {
            this.codeArr[emptyIndex] = num;
            this.dismiss('done');
        }
    };
    PincodeCmp.prototype.delClick = function () {
        this.codeArr.pop();
    };
    PincodeCmp.prototype.restoreClick = function () {
        this.codeArr = new Array(this.maxLen);
        this.codeArr.fill(null);
    };
    PincodeCmp.prototype.btnClick = function (button) {
        if (!this.enabled) {
            return;
        }
        // keep the time of the most recent button click
        this.lastClick = Date.now();
        var shouldDismiss = true;
        if (button.handler) {
            // a handler has been provided, execute it
            // pass the handler the values from the inputs
            if (button.handler(this.getValues()) === false) {
                // if the return value of the handler is false then do not dismiss
                shouldDismiss = false;
            }
        }
        if (shouldDismiss) {
            this.dismiss(button.role).catch(function () {
                console.debug('alert can not be dismissed');
            });
        }
    };
    PincodeCmp.prototype.isNum = function (num) {
        if (isNumber(num)) {
            return num <= 9 || num >= 0;
        }
        else {
            return false;
        }
    };
    PincodeCmp.prototype.bdClick = function () {
        if (this.enabled && this.d.enableBackdropDismiss) {
            this.dismiss('backdrop');
        }
    };
    PincodeCmp.prototype.cancelClick = function () {
        this.dismiss('cancel');
    };
    PincodeCmp.prototype.forgotClick = function () {
        this.dismiss('forgot');
    };
    PincodeCmp.prototype.dismiss = function (role) {
        this.stateExpression = 'off';
        var opts = {
            minClickBlockDuration: 400
        };
        return this._viewCtrl.dismiss(this.getValues(), role, opts);
    };
    PincodeCmp.prototype.getValues = function () {
        var values = '';
        this.codeArr.forEach(function (e) {
            e && (values += e.toString());
        });
        return this.d.encoded(values);
    };
    PincodeCmp.prototype.ngOnDestroy = function () {
        assert(this.gestureBlocker.blocked === false, 'gesture blocker must be already unblocked');
        this.gestureBlocker.destroy();
    };
    PincodeCmp.decorators = [
        { type: Component, args: [{
                    selector: 'ion-pincode',
                    animations: [
                        trigger('openClose', [
                            state('off, void', style({ bottom: '-295px' })),
                            state('on', style({ bottom: '0' })),
                            transition('on <=> off', [animate("400ms cubic-bezier(.36,.66,.04,1)")])
                        ])
                    ],
                    template: "\n      <ion-backdrop (click)=\"bdClick()\" [class.backdrop-no-tappable]=\"!d.enableBackdropDismiss\"></ion-backdrop>\n      <div class=\"pincode-wrapper\" [@openClose]=\"stateExpression\">\n          <div class=\"pincode-toolbar\">\n              <button *ngIf=\"!d.hideCancelButton\" ion-button clear (click)=\"cancelClick()\">{{d.cancelButtonText}}</button>\n              <div class=\"pincode-title\">{{d.title}}</div>\n              <button *ngIf=\"!d.hideForgotPassword\" ion-button clear small class=\"r-btn\" (click)=\"forgotClick()\">{{d.forgotPasswordText}}</button>\n          </div>\n          <div class=\"pincode-input\">\n              <ion-grid class=\"pincode-input-grid\">\n                  <ion-row class=\"pincode-input-row\">\n                      <ion-col *ngFor=\"let item of codeArr; let i = index\"> <span [class.on]=\"isNum(codeArr[i])\"></span></ion-col>\n                  </ion-row>\n              </ion-grid>\n          </div>\n          <div class=\"pincode-button-wrapper\">\n              <ion-grid>\n                  <ion-row>\n                      <ion-col>\n                          <button ion-button color=\"light\" (click)=\"numClick(1)\">1</button>\n                      </ion-col>\n                      <ion-col>\n                          <button ion-button color=\"light\" (click)=\"numClick(2)\">2</button>\n                      </ion-col>\n                      <ion-col>\n                          <button ion-button color=\"light\" (click)=\"numClick(3)\">3</button>\n                      </ion-col>\n                  </ion-row>\n                  <ion-row>\n                      <ion-col>\n                          <button ion-button color=\"light\" (click)=\"numClick(4)\">4</button>\n                      </ion-col>\n                      <ion-col>\n                          <button ion-button color=\"light\" (click)=\"numClick(5)\">5</button>\n                      </ion-col>\n                      <ion-col>\n                          <button ion-button color=\"light\" (click)=\"numClick(6)\">6</button>\n                      </ion-col>\n                  </ion-row>\n                  <ion-row>\n                      <ion-col>\n                          <button ion-button color=\"light\" (click)=\"numClick(7)\">7</button>\n                      </ion-col>\n                      <ion-col>\n                          <button ion-button color=\"light\" (click)=\"numClick(8)\">8</button>\n                      </ion-col>\n                      <ion-col>\n                          <button ion-button color=\"light\" (click)=\"numClick(9)\">9</button>\n                      </ion-col>\n                  </ion-row>\n                  <ion-row>\n                      <ion-col>\n                          <button ion-button color=\"light\" icon-only (click)=\"restoreClick()\">\n                              <ion-icon ios=\"ios-refresh\" name=\"md-refresh\"></ion-icon>\n                          </button>\n                      </ion-col>\n                      <ion-col>\n                          <button ion-button color=\"light\" (click)=\"numClick(0)\">0</button>\n                      </ion-col>\n                      <ion-col>\n                          <button ion-button color=\"light\" icon-only (click)=\"delClick()\">\n                              <ion-icon ios=\"ios-backspace\" name=\"md-backspace\"></ion-icon>\n                          </button>\n                      </ion-col>\n                  </ion-row>\n              </ion-grid>\n          </div>\n      </div>\n  ",
                    host: {
                        'role': 'dialog',
                        '[attr.aria-labelledby]': 'hdrId',
                        '[attr.aria-describedby]': 'descId'
                    },
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    PincodeCmp.ctorParameters = [
        { type: ViewController, },
        { type: ElementRef, },
        { type: Config, },
        { type: GestureController, },
        { type: NavParams, },
        { type: Renderer, },
        { type: Platform, },
    ];
    return PincodeCmp;
}());
//# sourceMappingURL=pincode-component.js.map