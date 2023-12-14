import type { Ref } from 'vue';
import { ref } from 'vue';
import type { OPExpose, OPMethod, OPOpts, OPProp } from '@/print/type/op-types';
import useOpProp from '@/print/hook/use-op-prop';
import useOpMethod from '@/print/hook/use-op-method';

export default (opts: OPOpts): [Ref<OPExpose>, OPProp, OPMethod] => {
  const insRef = ref<OPExpose>();
  const prop = useOpProp(opts);
  const method = useOpMethod(insRef, opts, prop);
  return [insRef, prop, method];
};
