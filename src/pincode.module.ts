/**
 * Created by hsuanlee on 2017/2/20.
 */
import { NgModule }           from '@angular/core';

import { CommonModule } from '@angular/common';
import {IonicModule} from "ionic-angular";

import { PincodeController } from './pincode'
import { PincodeCmp } from './pincode-component'

@NgModule({
  imports:  [  IonicModule, CommonModule ],
  declarations: [ PincodeCmp],
  exports:[],
  providers:[PincodeController],
  entryComponents:[PincodeCmp],

})
export class PincodeInputModule { }
