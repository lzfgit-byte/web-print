import type { Ref } from 'vue';
import type { OPViewerExpose } from '@/print/type/op-types';
import { PrintUtil } from '@/print/support/PrintUtil';

export default (elements: Ref<Ref<HTMLDivElement>[]>): OPViewerExpose => {
  return {
    print: async () => {
      await PrintUtil.print(elements.value.map((item) => item.value));
    },
  };
};
