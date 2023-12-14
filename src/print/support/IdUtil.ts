import type { Ref } from 'vue';

export class IdUtil {
  static getId() {
    return `${new Date().getTime()}`;
  }

  static getScopeId(elementRef: Ref<HTMLDivElement> | Ref<any>): string {
    return (elementRef.value as Record<string, any>).__vnode.scopeId;
  }
}
