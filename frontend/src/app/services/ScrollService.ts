import { Injectable } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollPosition: [number, number] = [0, 0];

  constructor(private viewportScroller: ViewportScroller) {}

  saveScrollPosition(): void {
    this.scrollPosition = this.viewportScroller.getScrollPosition();
  }

  restoreScrollPosition(): void {
    setTimeout(() => this.viewportScroller.scrollToPosition(this.scrollPosition), 0);
  }
}
