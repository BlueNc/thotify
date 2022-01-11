import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Directive({
  selector: '[thotifyLink]'
})
export class LinkDirective {

  @Input()
  thotifyLink: string = '';

  @HostListener('click') onClick(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'page': this.thotifyLink,
        'value': this.el.nativeElement.innerText.trim()
      }
    };
    this.router.navigate(['/login'], navigationExtras);
  }

  @HostBinding('class')
  elementClass = 'thotify-link';

  constructor(
    private router: Router,
    private el: ElementRef) { }

}
