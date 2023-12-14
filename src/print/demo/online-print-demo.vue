<template>
  <button @click="method.print">打印</button>
  <div style="width: 100%; height: 96%">
    <OnlinePrint ref="opRef" v-bind="opProps"></OnlinePrint>
  </div>
</template>
<script setup lang="ts">
  import OnlinePrint from '@/print/online-print.vue';
  import useOnlinePrint from '@/print/hook/use-online-print';
  const [opRef, opProps, method] = useOnlinePrint({});
</script>

<style scoped></style>
