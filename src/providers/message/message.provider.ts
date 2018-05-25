import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';

@Injectable()
export class MessageProvider {
    
    constructor(private toastController: ToastController, private alertController: AlertController) {}
    
    showMessageToast(message = ``, duration = 2000, position = 'bottom') {
        let toast = this.toastController.create({
            message,
            duration,
            position
        });
        toast.present();
    }
    
    showMessageConfirm(title = '', message = '', buttonCancel, buttonConfirm) {
        const popUp = this.alertController.create({
            title,
            message,
            buttons: [
                buttonCancel,
                buttonConfirm
            ]
        });
        popUp.present();
    }
    
    showMessage(title = '', message = '') {
        let alert = this.alertController.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }                
}