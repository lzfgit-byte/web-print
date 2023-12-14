import type { Ref } from 'vue';
import { onMounted, ref } from 'vue';
import type { OPRuleOpts } from '@/print/type/op-types';
import { GeometryUtil } from '@/print/support/GeometryUtil';
import { PositionUtil } from '@/print/support/PositionUtil';
const drawCM = (x1: number, y1: number, ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x1, 0); // 终点坐标
  ctx.stroke();
};
const drawMM = (x1: number, y1: number, ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x1, y1 * 0.6); // 终点坐标
  ctx.stroke();
};
const drawCMText = (x1: number, y1: number, text: number, ctx: CanvasRenderingContext2D) => {
  if (text % 10 !== 0) {
    text = text + (10 - (text % 10));
  }
  ctx.fillText(`${text}`, x1 + 2, y1 * 0.5);
};
export default (opts: OPRuleOpts = { height: 20, widthMM: 300 }, element: Ref<HTMLDivElement>) => {
  const canvas = document.createElement('canvas');
  const height = opts.height;
  const widthMM = opts.widthMM;
  canvas.width = GeometryUtil.getPxByMM(widthMM);
  canvas.height = height;
  const ctx2d = canvas.getContext('2d');
  ctx2d.beginPath();
  ctx2d.moveTo(0, canvas.height);
  ctx2d.lineTo(GeometryUtil.getPxByMM(widthMM), canvas.height);
  ctx2d.stroke();
  for (let i = 0; i <= widthMM; i++) {
    const currentX = GeometryUtil.getPxByMM(i);
    if (i % 10 === 0) {
      drawCM(currentX, 20, ctx2d);
      drawCMText(currentX, 20, i, ctx2d);
    } else {
      drawMM(currentX, 20, ctx2d);
    }
  }
  // 左侧;
  const width2 = ref();
  const src2 = ref();
  onMounted(() => {
    const canvas2 = document.createElement('canvas');
    width2.value = PositionUtil.getElementWH(element.value).offsetHeight;
    canvas2.width = width2.value;
    canvas2.height = height;
    const ctx2d2 = canvas2.getContext('2d');
    ctx2d2.beginPath();
    ctx2d2.moveTo(0, canvas2.height);
    ctx2d2.lineTo(width2.value, canvas2.height);
    ctx2d2.stroke();
    const widthMM2 = parseInt(`${GeometryUtil.getMMByPx(width2.value)}`);
    for (let i = 0; i <= widthMM2; i++) {
      const currentX = GeometryUtil.getPxByMM(i);
      if (i % 10 === 0) {
        drawCM(currentX, 20, ctx2d2);
        drawCMText(currentX, 20, widthMM2 - i, ctx2d2);
      } else {
        drawMM(currentX, 20, ctx2d2);
      }
    }
    src2.value = canvas2.toDataURL('image/png');
  });

  return {
    src: canvas.toDataURL('image/png'),
    src2,
    width: canvas.width,
    height: canvas.height,
    width2,
  };
};
