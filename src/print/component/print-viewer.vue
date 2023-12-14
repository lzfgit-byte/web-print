<template>
  <div ref="containerRef" class="print-view-container">
    <div ref="pageContainerRef" class="page-container" :style="{ width: `${width}px` }">
      <div
        v-for="(item, index) in pages"
        :key="index"
        :ref="(el) => (elementContainerRefs[index].value = el)"
        :style="{ pageBreakAfter: index < pages.length - 1 ? 'always' : false }"
        class="viewer-container"
      >
      </div>
    </div>
    <div
      class="ruler-top"
      :style="{
        width: `${width}px`,
        height: `${height}px`,
        left: `${height}px`,
        top: `${0 + y}px`,
      }"
    >
      <img :src="src" alt="" />
    </div>
    <div
      class="ruler-left"
      :style="{
        width: `${width2}px`,
        height: `${height}px`,
        left: `${0 - width2 / 2 + height / 2 + x}px`,
        top: `${width2 / 2 + height / 2}px`,
      }"
    >
      <img :src="src2" alt="" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import useOPRuler from '@/print/hook/use-op-ruler';
  import useOpViewerState from '@/print/hook/use-op-viewer-state';
  import usePrintViewExpose from '@/print/hook/use-print-view-expose';
  const { containerRef, pageContainerRef, x, y, pages, elementContainerRefs } = useOpViewerState();
  const { src, src2, width, height, width2 } = useOPRuler(undefined, pageContainerRef);
  defineExpose(usePrintViewExpose(elementContainerRefs));
</script>

<style scoped lang="less">
  @import '@/print/styles/viewer';
</style>
