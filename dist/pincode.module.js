var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "ionic-angular";
import { PincodeController } from './pincode';
import { PincodeCmp } from './pincode-component';
export var PincodeInputModule = (function () {
    function PincodeInputModule() {
    }
    PincodeInputModule = __decorate([
        NgModule({
            imports: [IonicModule, CommonModule],
            declarations: [PincodeCmp],
            exports: [],
            providers: [PincodeController],
            entryComponents: [PincodeCmp],
        })
    ], PincodeInputModule);
    return PincodeInputModule;
}());
//# sourceMappingURL=pincode.module.js.map