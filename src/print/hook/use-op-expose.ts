import { ref } from 'vue';
import type { OPExpose, OPViewerExpose } from '@/print/type/op-types';

export default () => {
  const viewRef = ref<OPViewerExpose>();
  const expose: OPExpose = {
    print: () => {
      return viewRef.value.print();
    },
  };
  return { viewRef, expose };
};
