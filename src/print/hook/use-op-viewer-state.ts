import type { Ref } from 'vue';
import { nextTick, onMounted, ref } from 'vue';
import { useDropZone, useScroll } from '@vueuse/core';
import type { OPViewerProp } from '@/print/type/op-types';
import { IdUtil } from '@/print/support/IdUtil';
import { PositionUtil } from '@/print/support/PositionUtil';
import { TextElement } from '@/print/element/TextElement';
import usePaperSize from '@/print/hook/use-paper-size';

export default (prop: OPViewerProp = {}) => {
  const containerRef = ref<HTMLDivElement>();
  const pageContainerRef = ref<HTMLDivElement>();
  const pages = ref([{ size: 'A4' }, { size: 'A4' }]);
  const elementContainerRefs = ref<Ref<HTMLDivElement>[]>(pages.value.map(() => ref()));
  const { x, y } = useScroll(containerRef, { behavior: 'smooth' });
  nextTick().then(() => {
    const { offsetWidth: w1 } = PositionUtil.getElementWH(pageContainerRef.value);
    const { offsetWidth } = PositionUtil.getElementWH(elementContainerRefs.value[0].value);
    x.value = (w1 - offsetWidth) / 2 - 40;
  });
  pages.value.forEach((item, index) => {
    usePaperSize(item, elementContainerRefs.value[index], index, pages.value.length);
    useDropZone(elementContainerRefs.value[index], {
      onDrop(v1, evt) {
        const { offsetX, offsetY } = PositionUtil.getOffsetPos(evt);
        evt.dataTransfer.items[0].getAsString((d) => {
          new TextElement({
            left: offsetX,
            top: offsetY,
            text: d,
            scopeId: IdUtil.getScopeId(elementContainerRefs.value[index]),
            parentRef: elementContainerRefs.value[index],
          }).render();
        });
      },
      onOver: (v1: any, evt: DragEvent) => {
        const { offsetX, offsetY } = PositionUtil.getOffsetPos(evt);
        // console.log(offsetX, offsetY);
      },
    });
  });

  return { containerRef, pageContainerRef, pages, x, y, elementContainerRefs };
};
