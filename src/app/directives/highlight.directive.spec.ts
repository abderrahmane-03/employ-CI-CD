import { HighlightDirective } from './highlight.directive';
import { ElementRef } from '@angular/core';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = new ElementRef(document.createElement('div')); // Mock ElementRef
    const directive = new HighlightDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
