<template>
  <div class="print-container">
    <div class="print-left"></div>
    <div class="print-center">
      <PrintViewer ref="viewRef"></PrintViewer>
    </div>
    <div class="print-right"></div>
  </div>
</template>
<script setup lang="ts">
  import PrintViewer from '@/print/component/print-viewer.vue';
  import useOpExpose from '@/print/hook/use-op-expose';
  const { viewRef, expose } = useOpExpose();
  defineExpose(expose);
</script>

<style scoped lang="less">
  @import '@/print/styles/online-print';
</style>
