import type { Ref } from 'vue';
import { onMounted } from 'vue';
import { paperSize } from '@/print/support/ConstData';
import { GeometryUtil } from '@/print/support/GeometryUtil';
import { IdUtil } from '@/print/support/IdUtil';

export default (
  opts = { size: 'A4' },
  element: Ref<HTMLDivElement>,
  current: number,
  total: number
) => {
  const { width, height, headerLine, gutterLine, footLine } = paperSize[opts.size];
  const widthPx = GeometryUtil.getPxByMM(width);
  const heightPx = GeometryUtil.getPxByMM(height);
  const headerPx = GeometryUtil.getPxByMM(headerLine);
  const gutterPx = GeometryUtil.getPxByMM(gutterLine);
  const footPx = GeometryUtil.getPxByMM(footLine);
  onMounted(() => {
    const scopeId = IdUtil.getScopeId(element);
    element.value.style.height = `${heightPx}px`;
    element.value.style.width = `${widthPx}px`;

    const dieEl = document.createElement('div');
    dieEl.innerHTML = ``;
    dieEl.setAttribute(scopeId, '');

    //
    (() => {
      [
        {
          top: headerPx + 20,
          left: gutterPx,
          isHeight: true,
          isWidth: false,
          length: heightPx - headerPx - footPx - 40,
          setStyle: (el: HTMLDivElement) => {
            el.style.borderColor = 'black';
            const dEl = document.createElement('div');
            dEl.innerHTML = `<div style="position: absolute;top:${heightPx / 2 - 40}px;left: ${
              gutterPx - 10
            }px;
            height: 66px;
            background-color: white;
            z-index: 2;
            width: 20px;
            ">装订线</div>`;
            element.value.appendChild(dEl);
          },
        },
        {
          top: headerPx,
          left: 0,
          isHeight: false,
          isWidth: true,
          length: widthPx,
        },
        {
          top: heightPx - footPx,
          left: 0,
          isHeight: false,
          isWidth: true,
          length: widthPx,
        },
      ].forEach(({ top, length, left, isHeight, isWidth, setStyle }) => {
        const divEl = document.createElement('div');
        divEl.classList.add('viewer-alignment-line');
        divEl.setAttribute(scopeId, '');
        //
        divEl.style.left = `${left}px`;
        //
        divEl.style.top = `${top}px`;
        if (left === 0 || isWidth) {
          divEl.style.width = `${length}px`;
        }
        if (top === 0 || isHeight) {
          divEl.style.height = `${length}px`;
        }
        setStyle && setStyle(divEl);
        element.value.appendChild(divEl);
      });
    })();
  });
};
