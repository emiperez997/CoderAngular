import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appStatus]',
  standalone: true,
})
export class StatusDirective implements OnChanges {
  @Input() appStatus: string = '';

  constructor(private elementRef: ElementRef) {
    this.changeBackground();
  }

  ngOnChanges() {
    this.changeBackground();
  }

  changeBackground() {
    switch (this.appStatus) {
      case 'ACTIVE':
      case 'ACCEPTED':
      case 'STARTED':
        this.elementRef.nativeElement.style.background = 'green';
        break;
      case 'INACTIVE':
      case 'REJECTED':
      case 'FINISHED':
        this.elementRef.nativeElement.style.background = 'red';
        break;
      case 'PENDING':
      case 'SCHEDULED':
        this.elementRef.nativeElement.style.background = 'orange';
        break;

      default:
        this.elementRef.nativeElement.style.background = 'black';
        break;
    }
  }
}
