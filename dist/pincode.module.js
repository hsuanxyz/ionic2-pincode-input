import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "ionic-angular";
import { PincodeController } from './pincode';
import { PincodeCmp } from './pincode-component';
export var PincodeInputModule = (function () {
    function PincodeInputModule() {
    }
    PincodeInputModule.decorators = [
        { type: NgModule, args: [{
                    imports: [IonicModule, CommonModule],
                    declarations: [PincodeCmp],
                    exports: [],
                    providers: [PincodeController],
                    entryComponents: [PincodeCmp],
                },] },
    ];
    /** @nocollapse */
    PincodeInputModule.ctorParameters = [];
    return PincodeInputModule;
}());
//# sourceMappingURL=pincode.module.js.map