import type { Ref } from 'vue';
import type { OPExpose, OPMethod, OPOpts, OPProp } from '@/print/type/op-types';

export default (insRef: Ref<OPExpose>, opts: OPOpts, prop: OPProp): OPMethod => {
  return {
    print: () => {
      return insRef.value.print();
    },
  };
};
