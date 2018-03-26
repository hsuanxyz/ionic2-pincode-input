import {
    Component,
    ElementRef,
    ViewEncapsulation,
    trigger,
    state,
    animate,
    transition,
    style,
    Renderer2
} from '@angular/core';

import {
    GestureController,
    BlockerDelegate,
    BLOCK_ALL,
    ViewController,
    Platform,
    NavOptions,
    NavParams,
    Config
} from 'ionic-angular';
import { assert, isNumber } from 'ionic-angular/util/util';
import { PincodeOpt } from './pincode-options';

@Component({
    selector: 'ion-pincode',
    animations: [
        trigger('openClose', [
            state('off, void', style({ bottom: '-295px' })),
            state('on', style({ bottom: '0' })),
            transition(
                'on <=> off', [animate("400ms cubic-bezier(.36,.66,.04,1)")])
        ])
    ],
    template: `
        <ion-backdrop (click)="bdClick()" [class.backdrop-no-tappable]="!d.enableBackdropDismiss"></ion-backdrop>
        <div class="pincode-wrapper"
             [class.hide-toolbar]="d.hideToolbar"
             [@openClose]="stateExpression">
            <div class="pincode-toolbar" *ngIf="!d.hideToolbar">
                <button *ngIf="!d.hideCancelButton" ion-button clear (click)="cancelClick()">{{d.cancelButtonText}}
                </button>
                <div class="pincode-title">{{d.title}}</div>
                <button *ngIf="!d.hideForgotPassword" ion-button clear small class="r-btn" (click)="forgotClick()">
                    {{d.forgotPasswordText}}
                </button>
            </div>
            <div class="pincode-input">
                <ion-grid class="pincode-input-grid">
                    <ion-row class="pincode-input-row">
                        <ion-col *ngFor="let item of codeArr; let i = index">
                            <span *ngIf="!d.visibility || (!isNum(codeArr[i]))" class="obscured" [class.filling]="isNum(codeArr[i])"></span>
                            <span *ngIf="d.visibility" class="code">{{item}}</span>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="pincode-button-wrapper">
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <button ion-button color="light" (click)="numClick(1)">1</button>
                        </ion-col>
                        <ion-col>
                            <button ion-button color="light" (click)="numClick(2)">2</button>
                        </ion-col>
                        <ion-col>
                            <button ion-button color="light" (click)="numClick(3)">3</button>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <button ion-button color="light" (click)="numClick(4)">4</button>
                        </ion-col>
                        <ion-col>
                            <button ion-button color="light" (click)="numClick(5)">5</button>
                        </ion-col>
                        <ion-col>
                            <button ion-button color="light" (click)="numClick(6)">6</button>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <button ion-button color="light" (click)="numClick(7)">7</button>
                        </ion-col>
                        <ion-col>
                            <button ion-button color="light" (click)="numClick(8)">8</button>
                        </ion-col>
                        <ion-col>
                            <button ion-button color="light" (click)="numClick(9)">9</button>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <button ion-button color="light" icon-only (click)="restoreClick()">
                                <ion-icon ios="ios-refresh" name="md-refresh"></ion-icon>
                            </button>
                        </ion-col>
                        <ion-col>
                            <button ion-button color="light" (click)="numClick(0)">0</button>
                        </ion-col>
                        <ion-col>
                            <button ion-button color="light" icon-only (click)="delClick()">
                                <ion-icon ios="ios-backspace" name="md-backspace"></ion-icon>
                            </button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
        </div>
    `,
    styleUrls: ['./pincode-component.scss'],
    host: {
        'role': 'dialog',
        '[attr.aria-labelledby]': 'hdrId',
        '[attr.aria-describedby]': 'descId'
    },
    encapsulation: ViewEncapsulation.None,
})
export class PincodeCmp {
    descId: string;
    stateExpression: string = 'off';
    d: PincodeOpt;
    codeArr: Array<number> = [];
    maxLen: number = 6;
    enabled: boolean;
    hdrId: string;
    id: number;
    lastClick: number;
    mode: string;
    gestureBlocker: BlockerDelegate;

    constructor(public _viewCtrl: ViewController,
                public _elementRef: ElementRef,
                config: Config,
                gestureCtrl: GestureController,
                params: NavParams,
                private _renderer: Renderer2,
                private _plt: Platform) {
        this.gestureBlocker = gestureCtrl.createBlocker(BLOCK_ALL);
        this.d = params.data;
        this.d.passSize && (this.maxLen = this.d.passSize);
        this.codeArr = new Array(this.maxLen);
        this.codeArr.fill(null);
        this.mode = config.get('mode');
        _renderer.addClass(_elementRef.nativeElement, `pincode-${this.mode}`);
        if (this.d.cssClass) {
            this.d.cssClass.split(' ').forEach(cssClass => {
                if (cssClass.trim() !== '') _renderer.addClass(_elementRef.nativeElement, cssClass);
            });
        }

    }

    ionViewDidLoad() {
        this.stateExpression = 'on';
    }

    ionViewWillEnter() {
        this.gestureBlocker.block();
    }

    ionViewDidLeave() {
        this._plt.focusOutActiveElement();
        this.gestureBlocker.unblock();
    }

    ionViewWillLeave() {
        this._plt.focusOutActiveElement();
    }

    ionViewDidEnter() {
        this._plt.focusOutActiveElement();
        this.enabled = true;
    }

    numClick(num: number) {
        if (num < 0 || num > 9) return;
        const emptyIndex = this.codeArr.indexOf(null);
        if (emptyIndex < this.maxLen - 1) {
            this.codeArr[emptyIndex] = num;
        } else if (emptyIndex === this.maxLen - 1) {
            this.codeArr[emptyIndex] = num;
            // If we have a completed PIN handler,
            // call it with the completed PIN.
            if (this.d.pinHandler) {
                this.d.pinHandler(this.getValues())
                .then(() => {
                    // PIN is valid.
                    this.dismiss('done');
                })
                .catch(() => {
                    // PIN is invalid.
                    this.restoreClick();
                });
            } else {
                this.dismiss('done');
            }
        }
    }

    delClick() {
        let i = this.codeArr.length - 1;
        for (i; i > -1; i--) {
            if (this.codeArr[i] !== null) {
                this.codeArr[i] = null;
                break;
            }
        }

    }

    restoreClick() {
        this.codeArr = new Array(this.maxLen);
        this.codeArr.fill(null);
    }

    btnClick(button: any) {

        if (!this.enabled) {
            return;
        }

        // keep the time of the most recent button click
        this.lastClick = Date.now();

        let shouldDismiss = true;

        if (button.handler) {
            // a handler has been provided, execute it
            // pass the handler the values from the inputs
            if (button.handler(this.getValues()) === false) {
                // if the return value of the handler is false then do not dismiss
                shouldDismiss = false;
            }
        }

        if (shouldDismiss) {
            this.dismiss(button.role).catch(() => {
                console.debug('alert can not be dismissed');
            });
        }
    }

    isNum(num: any): boolean {
        if (isNumber(num)) {
            return num <= 9 || num >= 0;
        } else {
            return false
        }
    }


    bdClick() {
        if (this.enabled && this.d.enableBackdropDismiss) {
            this.dismiss('backdrop');
        }
    }

    cancelClick() {
        this.dismiss('cancel');
    }

    forgotClick() {
        this.dismiss('forgot');
    }

    dismiss(role: any): Promise<any> {
        this.stateExpression = 'off';

        const opts: NavOptions = {
            minClickBlockDuration: 400
        };
        return this._viewCtrl.dismiss(this.getValues(), role, opts);
    }

    getValues(): string {
        return this.d.encoded(this.codeArr.join(''));
    }

    ngOnDestroy() {
        assert(this.gestureBlocker.blocked === false, 'gesture blocker must be already unblocked');
        this.gestureBlocker.destroy();
    }
}
