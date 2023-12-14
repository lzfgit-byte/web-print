let getDpi = () => {
  let divEl = document.createElement('div');
  divEl.style.cssText =
    'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden';
  document.body.appendChild(divEl);
  let dpi = divEl.offsetHeight;
  getDpi = () => dpi;
  divEl.parentNode.removeChild(divEl);
  return getDpi();
};
export class GeometryUtil {
  static getDpi(): number {
    return getDpi();
  }

  static getPxByMM(mm: number) {
    return GeometryUtil.getDpi() * (mm / 25.4);
  }

  static getMMByPx(px: number) {
    return (px / GeometryUtil.getDpi()) * 25.4;
  }
}
