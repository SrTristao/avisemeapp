import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
 selector: '[maskYear]'
})
export class MaskYearDirective {
    @Input() mask: string;
        constructor(
            private control: NgControl
        ) { }
                
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
                this.control.control.setValue(this.format(value));
            }
        }
    
        private format(v: string): string {
            v = v.replace(/\D/g, '');
            return v.substring(0, v.length > 4 ? 4 : v.length);
        }
}