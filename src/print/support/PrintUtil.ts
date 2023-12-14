// @ts-expect-error
import printTxt from '@/print/const/print.html?raw';
export class PrintUtil {
  static async print(elements: HTMLDivElement[]) {
    const iframe = document.createElement('iframe');
    iframe.style.visibility = 'hidden';
    iframe.style.position = 'absolute';
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    iframe.id = 'iframe-print';
    const printHtml = elements
      .map((item, index) => {
        if (elements.length === index + 1) {
          return item.outerHTML;
        }
        return `${item.outerHTML}`;
      })
      .join('');
    iframe.srcdoc = (printTxt as string).replace('$body', printHtml);
    iframe.onload = () => {
      iframe.contentWindow.print();
      setTimeout(() => {
        iframe.parentNode.removeChild(iframe);
      }, 100);
    };
    document.body.appendChild(iframe);
  }
}
