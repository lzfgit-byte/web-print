import type { Ref } from 'vue';

export class PositionUtil {
  static getOffsetPos(evt: DragEvent | MouseEvent): { offsetX: number; offsetY: number } {
    const offsetX = evt.offsetX;
    const offsetY = evt.offsetY;
    return { offsetX, offsetY };
  }

  static getClientPos(evt: DragEvent | MouseEvent) {
    const clientX = evt.clientX;
    const clientY = evt.clientY;
    return { clientX, clientY };
  }

  static getOffsetWH(elRef: Ref<HTMLDivElement>) {
    return PositionUtil.getElementWH(elRef.value);
  }

  static getElementWH(element: HTMLDivElement) {
    const offsetHeight = element.offsetHeight;
    const offsetWidth = element.offsetWidth;
    return { offsetHeight, offsetWidth };
  }
}
