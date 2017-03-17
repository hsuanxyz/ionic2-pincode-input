import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { PincodeController } from  '../../components/pincode-input/pincode'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  color:string = '#e00';

  constructor(
    public navCtrl: NavController,
    public alertCtrl: PincodeController,
  ) {
  }

  openPinCode():any{
    let pincode = this.alertCtrl.create();
    pincode.present();
    pincode.onDidDismiss( (res,s) => {
      console.log(res)
      console.log(s)
    });

  }

}
