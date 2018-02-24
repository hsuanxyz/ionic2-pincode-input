# ionic2-pincode-input

[![Dependency Status](https://david-dm.org/HsuanXyz/ionic2-pincode-input.svg)](https://david-dm.org/HsuanXyz/ionic2-pincode-input)
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][downloads-url] [![MIT License][license-image]][license-url]

A pin-code input for ionic2

[中文文档](https://github.com/HsuanXyz/ionic2-pincode-input/blob/master/README-CN.md)

![v](https://github.com/HsuanXyz/hsuanxyz.github.io/blob/master/assets/ionic2-pincode-input/pin-code.gif?raw=true)

## Installation

```bash
$ npm install ionic2-pincode-input --save
$ npm install @angular/animations --save
```

## Usage

app.module.ts
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

...

import { PincodeInputModule } from  'ionic2-pincode-input';

@NgModule({
  ...
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PincodeInputModule,
    IonicModule.forRoot(MyApp)
  ]
  ...
})
export class AppModule {}
```
your-page.ts

```typescript
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { PincodeController } from  'ionic2-pincode-input/dist/pincode'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  code:string;

  constructor(
    public navCtrl: NavController,
    public pincodeCtrl: PincodeController,
  ) {
  }

  openPinCode():any{

    let pinCode =  this.pincodeCtrl.create({
      title:'Pincode'
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

```

`pinHandler` example

```typescript
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { PincodeController } from  'ionic2-pincode-input/dist/pincode'

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

  constructor(
    public navCtrl: NavController,
    public pincodeCtrl: PincodeController,
  ) {

  }
  
  openPinCode():any{

    let pinCode =  this.pincodeCtrl.create({
      title:'Pincode',
      pinHandler: this.handlePIN
    });

    pinCode.present();

    pinCode.onDidDismiss( (code,status) => {

      if (status === 'forgot'){

        // forgot password
      }

    })

  }

}

```

## create(PincodeOpt)

### PincodeOpt
| Name            | Type          | Default       | Description |
| --------------- | ------------- | ------------- | ----------- |
| cssClass        | string        | `''`          | separated by spaces|
| passSize        | number        | `6`           | your password size|
| title           | String        | `'password'`  | title       |
| cancelButtonText| String        | `'cancel'`    | cancel button text    |
| encoded         | Function      | ` (c) => {return c} ` | your encoded pin code function |
| forgotPasswordText| String      | `'forgot password'`| forgot password text    |
| hideToolbar| Boolean     | `false`       | is hide toolbar   |
| hideForgotPassword| Boolean     | `false`       | is hide forgot password button   |
| hideCancelButton | Boolean     | `false`       | is hide cancel button   |
| enableBackdropDismiss| Boolean     | `true`       | Whether the alert should be dismissed by tapping the backdrop.  |
| pinHandler| PincodePinHandler `(pin: string): Promise<any>`    | `null`       | Callback called when the PIN is complete. Returns a Promise which resolves if the PIN is valid.  |

[npm-url]: https://www.npmjs.com/package/ionic2-pincode-input
[npm-image]: https://img.shields.io/npm/v/ionic2-pincode-input.svg

[downloads-image]: https://img.shields.io/npm/dm/ionic2-pincode-input.svg
[downloads-url]: http://badge.fury.io/js/ionic2-pincode-input

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
