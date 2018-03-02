import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingProvider {
    
    constructor(private loadingController: LoadingController) {}

    loadingDefault(message) {
        return this.loadingController.create({
          content: message
        });
    }
}