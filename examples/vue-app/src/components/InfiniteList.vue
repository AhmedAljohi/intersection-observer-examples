<template>
  <div :ref="observerRef" style="height: 1px;"></div>
</template>

<script setup>
import { useInView } from '@intersection-observer/vue'
const props = defineProps({
  loadMore: Function
})
const { ref: observerRef, inView } = useInView({ threshold: 0.5 })
watch(inView, (visible) => {
  if (visible) props.loadMore()
})
</script>
