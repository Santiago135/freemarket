import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTest]'
})
export class TestDirective implements OnInit {
  @Input() nombreTest: string | number = "";
  constructor(private el: ElementRef) { }
  @HostListener('input')
  ngOnInit() {
    const itemToCheck = this.nombreTest;

    const value = this.el.nativeElement.value;
    if (value != this.nombreTest) {
      this.el.nativeElement.style.outline = "none";
      this.el.nativeElement.style.border = "1px solid red"
    }
    else{
      this.el.nativeElement.style.border = "1px solid black";
    }
  }

}
