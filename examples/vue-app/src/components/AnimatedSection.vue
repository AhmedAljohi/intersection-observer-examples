<template>
  <div :ref="observerRef" :style="{ opacity: inView ? 1 : 0, transition: 'opacity 0.6s' }">
    <slot />
  </div>
</template>

<script setup>
import { useInView } from '@intersection-observer/vue'
const { ref: observerRef, inView } = useInView({ threshold: 0.2 })
</script>
