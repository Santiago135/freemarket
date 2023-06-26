import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appValidateSamePasswords]'
})
export class ValidateSamePasswordsDirective {
  @Input() pass: string | number = "";
  constructor(private el: ElementRef) { }
  @HostListener('input')
  ngOnInit() {
    const value = this.el.nativeElement.value;
    if (value != this.pass) {
      this.el.nativeElement.style.outline = "none";
      this.el.nativeElement.style.border = "1px solid red"
    }
    else{
      this.el.nativeElement.style.border = "1px solid black";
    }
  }

}

