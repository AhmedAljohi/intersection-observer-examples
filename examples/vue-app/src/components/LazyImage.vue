<template>
  <div :ref="observerRef" style="min-height: 600px;">
    <img v-if="inView" :src="src" :alt="alt" width="100%" />
  </div>
</template>

<script setup>
import { useInView } from '@intersection-observer/vue'
const props = defineProps({
  src: String,
  alt: String
})
const { ref: observerRef, inView } = useInView()
</script>
