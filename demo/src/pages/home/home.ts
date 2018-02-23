import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PincodeController } from  'ionic2-pincode-input'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  code:string;
  private handlePIN: (pincode: string) => Promise<any> = (pincode: string) => {
    if (pincode === '123456') {
      // Do something
      console.log('Too easy');
      return Promise.reject('');
    } else {
      // Do something
      return Promise.resolve();
    }
  };

  constructor(public navCtrl: NavController, public pincodeCtrl: PincodeController,) {

  }

  openPinCode():any{

    let pinCode =  this.pincodeCtrl.create({
      title:'Pincode',
      pinHandler: this.handlePIN
    });

    pinCode.present();

    pinCode.onDidDismiss( (code,status) => {
      if(status === 'done'){
        this.code = code;
      }else if (status === 'forgot'){
        // forgot password
      }
    })

  }

}
