<template>
  <div>
    <h1>Vue Intersection Observer Sandbox</h1>

    <!-- 1. Lazy Loading Images -->
    <section>
      <h2>1. Lazy Loading Images</h2>
      <LazyImage src="https://picsum.photos/300/200?random=1" />
      <LazyImage src="https://picsum.photos/300/200?random=2" />
      <LazyImage src="https://picsum.photos/300/200?random=3" />
      <LazyImage src="https://picsum.photos/300/200?random=4" />
    </section>

    <!-- 2. Infinite Scroll -->
    <section>
      <h2>2. Infinite Scroll</h2>
      <div v-for="(item, i) in items" :key="i">{{ item }}</div>
      <InfiniteList :load-more="loadMore" />
    </section>

    <!-- 3. Scroll-Based Animations -->
    <section>
      <h2>3. Scroll-Based Animations</h2>
      <AnimatedSection v-for="n in 5" :key="n">
        <template #default>
          <div style="height: 150px; margin: 20px 0; background: #ccc">
            Animation section {{ n }}
          </div>
        </template>
      </AnimatedSection>
    </section>

    <!-- 4. Analytics Tracking -->
    <section>
      <h2>4. Analytics Tracking</h2>
      <LazyRender :onChange="onTrack">
        <template #default="{ ref }">
          <div ref="ref" style="height: 200px; background: #88c">
            Track me
          </div>
        </template>
      </LazyRender>
    </section>

    <!-- 5. Conditional Rendering with Render Props -->
    <section>
      <h2>5. Conditional Rendering with Render Props</h2>
      <LazyRender>
        <template #default="{ inView, ref }">
          <div ref="ref" style="height: 150px; margin: 10px; background: #faa">
            {{ inView ? "In view → Render content" : "Not in view" }}
          </div>
        </template>
      </LazyRender>
    </section>

    <!-- 6. Performance Monitoring -->
    <section>
      <h2>6. Performance Monitoring</h2>
      <LazyRender :onChange="onPerf">
        <template #default="{ ref }">
          <div ref="ref" style="height: 150px; margin: 10px; background: #aaf">
            Check console for perf logs
          </div>
        </template>
      </LazyRender>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { LazyRender } from '@intersection-observer/vue'
import LazyImage from './components/LazyImage.vue'
import InfiniteList from './components/InfiniteList.vue'
import AnimatedSection from './components/AnimatedSection.vue'

const items = ref([])

const loadMore = () => {
  const next = Array.from({ length: 10 }, (_, i) => `Item ${items.value.length + i + 1}`)
  items.value.push(...next)
}

onMounted(loadMore)

const onTrack = (inView) => {
  if (inView) {
    console.log('Tracking element visible:')
  }
}

const onPerf = (inView) => {
  console.log('Performance inView:', inView)
}
</script>