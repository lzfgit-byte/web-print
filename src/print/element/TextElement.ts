import { BaseElement } from '@/print/element/BaseElement';
import type { TextElementOpts } from '@/print/type/elemenet-types';

export class TextElement extends BaseElement {
  text = '';
  label = '';
  constructor(opts: TextElementOpts) {
    super(opts);
    this.text = opts.text;
    this.label = opts.label;
    this.type = 'text';
    this.draw();
  }

  draw() {
    this.element.classList.add('viewer-text');
    this.element.innerHTML = `<span ${this.scopeId} style="color:#333">${this.text}</span>`;
  }
}
