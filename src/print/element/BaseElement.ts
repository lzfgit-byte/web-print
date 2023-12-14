import type { Ref } from 'vue';
import { bus } from '@/print/support/bus';
import { IdUtil } from '@/print/support/IdUtil';
import type { BaseElementOpts, ElementTypes } from '@/print/type/elemenet-types';
import { PositionUtil } from '@/print/support/PositionUtil';

class BaseProp {
  id = '';
  element: HTMLDivElement = null;
  focusClass = 'viewer-element-focus';
  isFocus = false;
  isMouseDown = false;
  unFocusedEvent = 'element-unfocused';
  type: ElementTypes = 'text';
  left = 0;
  top = 0;
  scopeId = '';
  parentRef: Ref<HTMLDivElement> = null;
  parentHeight = 0;
  parentWidth = 0;
  oldPos = [0, 0];
  width = -1;
  height = -1;
  onClick = null;
  constructor() {
    this.id = IdUtil.getId();
  }
}
export class BaseElement extends BaseProp {
  constructor(opts: BaseElementOpts) {
    super();
    this.element = document.createElement('div');
    this.scopeId = opts.scopeId;
    this.parentRef = opts.parentRef;
    const { offsetWidth, offsetHeight } = PositionUtil.getOffsetWH(this.parentRef);
    this.parentWidth = offsetWidth;
    this.parentHeight = offsetHeight;
    this.onClick = opts.onClick;
    this.updateWH(opts.width, opts.height);
    this.setPos(opts.left, opts.top);
    this.initDraw();
    this.watch();
    this.initEvent();
    this.updatePos(this.left, this.top);
  }

  setPos(left: number, top: number) {
    this.left = left;
    this.top = top;
  }

  updatePos(left: number, top: number) {
    if (left < 0 || top < 0) {
      return;
    }
    if (left + this.width > this.parentWidth || top + this.height > this.parentHeight) {
      return;
    }
    this.element.style.top = `${top}px`;
    this.element.style.left = `${left}px`;
    this.clearAlignmentLine();
    this.renderAlignmentLine();
  }

  initDraw() {
    this.element.classList.add('viewer-element');
    this.element.setAttribute(this.scopeId, '');
  }

  draw() {}
  getAlignmentLineId(index: number) {
    return this.scopeId + index;
  }

  clearAlignmentLine() {
    Array.from({ length: 4 }).forEach((it, index) => {
      const el = document.getElementById(this.getAlignmentLineId(index));
      el && el.parentNode.removeChild(el);
    });
  }

  renderAlignmentLine() {
    if (!this.isMouseDown) {
      return;
    }
    [
      { left: 0, top: this.top, length: this.parentWidth },
      { left: 0, top: this.top + this.height, length: this.parentWidth },
      { left: this.left, top: 0, length: this.parentHeight },
      { left: this.left + this.width, top: 0, length: this.parentHeight },
    ].forEach(({ left, top, length }, index) => {
      if (left === 0 && top === 0) {
        return;
      }
      const divEl = document.createElement('div');
      divEl.classList.add('viewer-alignment-line');
      divEl.id = this.getAlignmentLineId(index);
      divEl.setAttribute(this.scopeId, '');
      divEl.style.left = `${left}px`;
      divEl.style.top = `${top}px`;

      if (left === 0) {
        divEl.style.width = `${length}px`;
      }
      if (top === 0) {
        divEl.style.height = `${length}px`;
      }
      this.parentRef.value.appendChild(divEl);
    });
  }

  onMouseDown() {
    this.isMouseDown = true;
    this.renderAlignmentLine();
  }

  onMouseUp() {
    this.isMouseDown = false;
    this.clearAlignmentLine();
  }

  watch() {
    this.element.addEventListener('click', (evt: PointerEvent) => {
      this.focus();
      evt.stopPropagation();
      this.onClick && this.onClick(this.element);
    });
    this.parentRef.value.addEventListener('click', (evt: PointerEvent) => {
      evt.stopPropagation();
      this.unFocused();
    });
    this.element.addEventListener('mousemove', (evt: MouseEvent) => {
      if (evt.buttons === 1) {
        const { clientX, clientY } = PositionUtil.getClientPos(evt);
        this.left = this.left + (clientX - this.oldPos[0]);
        this.top = this.top + (clientY - this.oldPos[1]);
        this.updatePos(this.left, this.top);
        this.oldPos = [clientX, clientY];
      } else {
        this.onMouseUp();
      }
    });
    this.element.addEventListener('mousedown', (evt: MouseEvent) => {
      const { clientX, clientY } = PositionUtil.getClientPos(evt);
      this.oldPos = [clientX, clientY];
      this.onMouseDown();
    });
    this.element.addEventListener('mouseup', (evt: MouseEvent) => {
      this.onMouseUp();
    });
  }

  initEvent() {
    bus.on(this.unFocusedEvent, (id: string) => {
      if (this.id !== id) {
        this.unFocused();
      }
    });
  }

  focus() {
    if (!this.element.classList.contains(this.focusClass)) {
      this.element.classList.add(this.focusClass);
      this.isFocus = true;
      bus.emit(this.unFocusedEvent, this.id);
    }
  }

  unFocused() {
    this.element.classList.remove(this.focusClass);
    this.isFocus = false;
    this.clearAlignmentLine();
  }

  get() {
    return this.element;
  }

  updateWH(width: number, height: number) {
    if (width) {
      this.width = width;
    }
    if (height) {
      this.height = height;
    }
    this.element.style.width = this.width > 0 ? `${this.width}px` : 'unset';
    this.element.style.height = this.height > 0 ? `${this.height}px` : 'unset';
  }

  render() {
    this.parentRef.value.appendChild(this.get());
    if (this.width > 0 && this.height > 0) {
      return;
    }
    const { offsetWidth, offsetHeight } = PositionUtil.getElementWH(this.element);
    this.updateWH(offsetWidth, offsetHeight);
  }
}
