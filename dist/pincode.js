var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { App } from 'ionic-angular';
import { PincodeCmp } from './pincode-component';
import { isPresent, isFunction } from 'ionic-angular/util/util';
import { ViewController } from 'ionic-angular';
/**
 * @private
 */
export var PinCode = (function (_super) {
    __extends(PinCode, _super);
    function PinCode(app, opts) {
        if (opts === void 0) { opts = {}; }
        opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ?
            !!opts.enableBackdropDismiss : true;
        opts.hideForgotPassword = isPresent(opts.hideForgotPassword) ?
            !!opts.hideForgotPassword : false;
        opts.hideCancelButton = isPresent(opts.hideCancelButton) ?
            !!opts.hideCancelButton : false;
        opts.encoded = isFunction(opts.encoded) ? opts.encoded : function (c) { return c; };
        opts.title = opts.title || 'Password';
        opts.cancelButtonText = opts.cancelButtonText || 'cancel';
        opts.forgotPasswordText = opts.forgotPasswordText || 'forgot password';
        _super.call(this, PincodeCmp, opts, null);
        this._app = app;
        //noinspection TypeScriptUnresolvedVariable
        this.isOverlay = true;
    }
    /**
    * @private
    */
    PinCode.prototype.getTransitionName = function (direction) {
        var key = (direction === 'back' ? 'alertLeave' : 'alertEnter');
        //noinspection TypeScriptUnresolvedVariable
        return this._nav && this._nav.config.get(key);
    };
    PinCode.prototype.setTitle = function (title) {
        //noinspection TypeScriptUnresolvedVariable
        this.data.title = title;
    };
    PinCode.prototype.setCssClass = function (cssClass) {
        //noinspection TypeScriptUnresolvedVariable
        this.data.cssClass = cssClass;
    };
    PinCode.prototype.present = function (navOptions) {
        if (navOptions === void 0) { navOptions = {}; }
        navOptions.minClickBlockDuration = navOptions.minClickBlockDuration || 400;
        return this._app.present(this, navOptions);
    };
    return PinCode;
}(ViewController));
export var PincodeController = (function () {
    function PincodeController(_app) {
        this._app = _app;
    }
    PincodeController.prototype.create = function (opts) {
        if (opts === void 0) { opts = {}; }
        return new PinCode(this._app, opts);
    };
    PincodeController.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PincodeController.ctorParameters = [
        { type: App, },
    ];
    return PincodeController;
}());
//# sourceMappingURL=pincode.js.map