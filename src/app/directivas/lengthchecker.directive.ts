import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appLengthchecker]'
})
export class LengthcheckerDirective implements OnInit {
  @Input() nombreTest: string | number = "";
  constructor(private el: ElementRef) { }
  
  @HostListener('input')
  ngOnInit() {
    const value = this.el.nativeElement.value;
    if (value.length < 8 && value.length > 0) {
      this.el.nativeElement.style.outline = "none";
      this.el.nativeElement.style.border = "1px solid red";
    }
    else{
      this.el.nativeElement.style.border = "1px solid black";
    }
  }

}