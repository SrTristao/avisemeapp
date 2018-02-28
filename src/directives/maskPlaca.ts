import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
 selector: '[maskPlaca]'
})
export class MaskPlacaDirective {
    @Input() mask: string;
        private regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
        constructor(
            private control: NgControl
        ) { }
        
        /*when loading dynamically data to the input, without this 
        the mask will only work on keyup event changes */
        @HostListener('change') ngOnChanges() {
            let value = this.control.control.value;
            if (value) {
                this.control.control.setValue(this.format(value));
            }
        }
        
        @HostListener('keyup', ['$event'])
        onKeyUp($event: any) {
            if ($event.keyCode !== 13 && $event.keyCode !== 9 && $event.keyCode !== 8) {
                let value = this.control.control.value;
                console.log(value);
                this.control.control.setValue(this.format(value));
            }
        }
    
        private format(v: string): string {
            let s = '';
            v.split('').forEach((word, index) => {
                if (index <= 2) {
                    if (word.match(/[a-zA-Z]/)) {
                        s+= word
                        if (index === 2) s += '-';
                    }
                    
                } else if (index <= 8) {
                    if (word.match(/\d/)) s+=word;
                }
            })

            return s.toUpperCase();
        }
}