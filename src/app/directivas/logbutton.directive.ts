import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appLogbutton]'
})
export class LogbuttonDirective {
  @Input() col:string = "";
  @Input() textCol: string = "";
  private prevColor = this.el.nativeElement.style.backgroundColor;

  @HostListener("mouseover")
  onMouseHover() {
    this.highlight(this.col);
  }

  @HostListener("mouseout")
  onMouseOut() {
    this.highlight(this.prevColor);
  }

  constructor(private el: ElementRef) { }

  public highlight(color: string){
    this.el.nativeElement.style.backgroundColor = color;
  }
}
