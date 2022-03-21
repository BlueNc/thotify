import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';


@Directive({
  selector: '[thotifyLink]'
})
export class LinkDirective {

  private nodeType: string | undefined;

  private paths: any[] | undefined;

  @Input()
  set thotifyLink(value: string | any[]) {
    if (Array.isArray(value)) {
      this.paths = value
    } else {
      this.nodeType = value;
    }
  }

  @HostListener('click') onClick(){
    if (this.paths) {
      this.router.navigate(this.paths);
    } else {
      this.router.navigate([this.nodeType, this.el.nativeElement.innerText.trim()]);
    }
  }

  @HostBinding('class')
  elementClass = 'thotify-link';

  constructor(
    private router: Router,
    private el: ElementRef) { }
}
