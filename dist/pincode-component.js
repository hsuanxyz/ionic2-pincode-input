var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, ViewEncapsulation, trigger, state, animate, transition, style } from '@angular/core';
import { BLOCK_ALL } from 'ionic-angular';
import { assert, isNumber } from 'ionic-angular/util/util';
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
        // normalize the data
        this.stateExpression = 'on';
        var data = this.d;
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
        if (this.codeArr.length < this.maxLen - 1) {
            this.codeArr.push(num);
        }
        else if (this.codeArr.length === this.maxLen - 1) {
            this.codeArr.push(num);
            this.dismiss('inputDone');
        }
    };
    PincodeCmp.prototype.delClick = function () {
        this.codeArr.pop();
    };
    PincodeCmp.prototype.restoreClick = function () {
        this.codeArr = [];
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
            values += e.toString();
        });
        return this.d.encoded(values);
    };
    PincodeCmp.prototype.ngOnDestroy = function () {
        assert(this.gestureBlocker.blocked === false, 'gesture blocker must be already unblocked');
        this.gestureBlocker.destroy();
    };
    PincodeCmp = __decorate([
        Component({
            selector: 'ion-pincode',
            animations: [
                trigger('openClose', [
                    state('off, void', style({ bottom: '-295px' })),
                    state('on', style({ bottom: '0' })),
                    transition('on <=> off', [animate("400ms cubic-bezier(.36,.66,.04,1)")])
                ])
            ],
            template: '<ion-backdrop (click)="bdClick()" [class.backdrop-no-tappable]="!d.enableBackdropDismiss"></ion-backdrop>' +
                '<div class="pincode-wrapper"  [@openClose]="stateExpression">' +
                '   <div class="pincode-toolbar"> ' +
                '     <button ion-button clear (click)="cancelClick()">{{d.cancelButtonText}}</button>' +
                '      <div class="pincode-title">{{d.title}}</div>' +
                '     <button ion-button clear small  class="r-btn" (click)="cancelClick()">{{d.forgotPasswordText}}</button>' +
                '   </div>' +
                '   <div class="pincode-input">' +
                '     <ion-grid class="pincode-input-grid">' +
                '       <ion-row class="pincode-input-row">' +
                '         <ion-col style="border-left: 0;"><span [class.on]="isNum(codeArr[0])"></span></ion-col>' +
                '         <ion-col> <span [class.on]="isNum(codeArr[1])"></span></ion-col>' +
                '         <ion-col> <span [class.on]="isNum(codeArr[2])"></span></ion-col>' +
                '         <ion-col> <span [class.on]="isNum(codeArr[3])"></span></ion-col>' +
                '         <ion-col> <span [class.on]="isNum(codeArr[4])"></span></ion-col>' +
                '         <ion-col> <span [class.on]="isNum(codeArr[5])"></span></ion-col>' +
                '       </ion-row>' +
                '     </ion-grid>' +
                '   </div>' +
                '   <div class="pincode-button-wrapper">' +
                '     <ion-grid> ' +
                '       <ion-row> ' +
                '         <ion-col><button ion-button color="light" (click)="numClick(1)">1</button></ion-col>' +
                '         <ion-col><button ion-button color="light" (click)="numClick(2)">2</button></ion-col>' +
                '         <ion-col><button ion-button color="light" (click)="numClick(3)">3</button></ion-col>' +
                '       </ion-row>' +
                '       <ion-row> ' +
                '         <ion-col><button ion-button color="light" (click)="numClick(4)">4</button></ion-col>' +
                '         <ion-col><button ion-button color="light" (click)="numClick(5)">5</button></ion-col>' +
                '         <ion-col><button ion-button color="light" (click)="numClick(6)">6</button></ion-col>' +
                '       </ion-row>' +
                '       <ion-row> ' +
                '         <ion-col><button ion-button color="light" (click)="numClick(7)">7</button></ion-col>' +
                '         <ion-col><button ion-button color="light" (click)="numClick(8)">8</button></ion-col>' +
                '         <ion-col><button ion-button color="light" (click)="numClick(9)">9</button></ion-col>' +
                '       </ion-row>' +
                '       <ion-row> ' +
                '         <ion-col><button ion-button color="light" icon-only (click)="restoreClick()">' +
                '           <ion-icon ios="ios-refresh"  name="md-refresh">' +
                '         </ion-icon></button></ion-col>' +
                '         <ion-col><button ion-button color="light" (click)="numClick(0)">0</button></ion-col>' +
                '         <ion-col><button ion-button color="light" icon-only (click)="delClick()">' +
                '           <ion-icon ios="ios-backspace"  name="md-backspace">' +
                '         </ion-icon></button></ion-col>' +
                '       </ion-row>' +
                '     </ion-grid>' +
                '   </div>' +
                '</div>',
            host: {
                'role': 'dialog',
                '[attr.aria-labelledby]': 'hdrId',
                '[attr.aria-describedby]': 'descId'
            },
            styles: [
                "\n      ion-alert {\n        z-index: 1000;\n        display: flex;\n      }\n      \n      .pincode-wrapper {\n        z-index: 10;\n        position: absolute;\n        bottom: 0;\n        left: 0;\n        right: 0;\n        display: block;\n        overflow: hidden;\n        width: 100%;\n        max-width: 500px;\n        height: 295px;\n        margin: auto;\n        background-color: #fcfcfc;\n        border-top: 1px solid #c8c7cc;\n        contain: content;\n      }\n      \n      .pincode-md .pincode-wrapper, .pincode-wp .pincode-wrapper {\n        background-color: #fff;\n      }\n      \n      .pincode-toolbar {\n        z-index: 1;\n        width: 100%;\n        contain: strict;\n        display: block;\n        height: 44px;\n        border-bottom: 0.55px solid #c8c7cc;\n        background: #fff;\n      }\n      .pincode-toolbar button {\n        margin: 0;\n        height: 44px;\n        background: transparent;\n        z-index: 1;\n      }\n      .pincode-toolbar .r-btn {\n        float: right;\n        text-align: left;\n        font-size: 12px;\n        text-transform: none;\n        font-weight: 400;\n      }\n      .pincode-toolbar .pincode-title {\n        text-align: center;\n        width: 100%;\n        line-height: 44px;\n        position: absolute;\n        left: 0;\n        right: 0;\n        top: 0;\n        bottom: 0;\n      }\n      \n      .pincode-md .pincode-toolbar, .pincode-wp .pincode-toolbar {\n        border-bottom: none;\n      }\n      \n      .pincode-input {\n        margin: 16px;\n      }\n      .pincode-input .pincode-input-grid {\n        border: 1px solid #e4e4e4;\n      }\n      .pincode-input .pincode-input-row {\n        text-align: center;\n      }\n      .pincode-input .pincode-input-row ion-col {\n        border-left: 1px solid #e4e4e4;\n        height: 32px;\n        line-height: 32px;\n        padding: 0;\n      }\n      .pincode-input .pincode-input-row ion-col span.on {\n        width: 1em;\n        height: 1em;\n        border-radius: 1em;\n        background-color: #333;\n        display: inline-block;\n      }\n      \n      .pincode-button-wrapper {\n        position: absolute;\n        width: 100%;\n        bottom: 0;\n      }\n      .pincode-button-wrapper .grid {\n        padding: 0;\n      }\n      .pincode-button-wrapper ion-col {\n        padding: 0;\n      }\n      .pincode-button-wrapper ion-col button {\n        border: none;\n        margin: 0;\n        width: 100%;\n        background-color: #fff;\n        color: #000;\n        box-shadow: none;\n        border-radius: 0;\n      }\n\n    "
            ],
            encapsulation: ViewEncapsulation.None,
        })
    ], PincodeCmp);
    return PincodeCmp;
}());
//# sourceMappingURL=pincode-component.js.map