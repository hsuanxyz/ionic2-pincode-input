# ionic2-pincode-input

[![Dependency Status](https://david-dm.org/HsuanXyz/ionic2-pincode-input.svg)](https://david-dm.org/HsuanXyz/ionic2-pincode-input)
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][downloads-url] [![MIT License][license-image]][license-url]

一个ionic2的PIN码输入组件

[live demo](https://stackblitz.com/edit/ionic2-pincode-input)


![v](https://github.com/HsuanXyz/hsuanxyz.github.io/blob/master/assets/ionic2-pincode-input/pin-code.gif?raw=true)
## 安装

`npm install ionic2-pincode-input --save`

## 使用

app.module.ts
```typescript
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
...

import { PincodeInputModule } from  'ionic2-pincode-input';

@NgModule({
  declarations: [
    MyApp,
    ...
  ],
  imports: [
    PincodeInputModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ...
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
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
        // 输入完成
        this.code = code;
      }else if (status === 'forgot'){
        // 忘记密码
      }

    })

  }

}

```


## create(PincodeOpt)

### PincodeOpt
| Name            | Type          | Default       | Description |
| --------------- | ------------- | ------------- | ----------- |
| cssClass        | string        | `''`          | 空格分开 |
| passSize        | number        | `6`           | 你的密码长度|
| title           | String        | `'password'`  | 标题       |
| cancelButtonText| String        | `'cancel'`    | 取消按钮文字    |
| encoded         | Function      | ` (c) => {return c} ` | 用于在返回code前编码的函数 |
| forgotPasswordText| String      | `'forgot password'`| 忘记密码的文字    |
| hideToolbar| Boolean     | `false`       | 隐藏工具栏   |
| hideForgotPassword| Boolean     | `false`       | 隐藏忘记密码按钮   |
| hideCancelButton | Boolean     | `false`       | 隐藏取消按钮  |
| enableBackdropDismiss| Boolean     | `true`       | 是否可以点击遮罩关闭组件  |

[npm-url]: https://www.npmjs.com/package/ionic2-pincode-input
[npm-image]: https://img.shields.io/npm/v/ionic2-pincode-input.svg

[downloads-image]: https://img.shields.io/npm/dm/ionic2-pincode-input.svg
[downloads-url]: http://badge.fury.io/js/ionic2-pincode-input

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
