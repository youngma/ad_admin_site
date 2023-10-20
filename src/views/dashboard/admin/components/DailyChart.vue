<template>
  <div ref="elRef" :class="[$attrs.class]" :style="styles"></div>
</template>

<script setup>
import echarts from '@/plugins/echarts'
import { debounce } from 'lodash-es'
import { computed, ref, unref, watch, onMounted, onBeforeUnmount, onActivated, defineExpose } from 'vue'

const { options, width, height } = defineProps(
  {
    options: {
      type: Object,
      required: true
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  }
)

const elRef = ref(null)
let echartRef = null
const contentEl = ref(null)

const styles = computed(() => {
  const height = `400px`
  const width = `100%`
  return {
    width,
    height
  }
})


const initChart = (op) => {

  if (unref(elRef) && options && !echartRef) {
    echartRef = echarts.init(unref(elRef))
    echartRef.setOption(unref(options))
  }

  if (op) {
    echartRef.setOption(op)
  }
}

defineExpose({
  initChart
})

watch(
  () => options,
  (options) => {
    if (echartRef) {
      echartRef.setOption(options)
    }
  },
  {
    deep: true
  }
)

const resizeHandler = debounce(() => {
  if (echartRef) {
    echartRef.resize()
  }
}, 100)

const contentResizeHandler = async(e) => {
  if (e.propertyName === 'width') {
    resizeHandler()
  }
}

onMounted(() => {
  initChart()

  window.addEventListener('resize', resizeHandler)

  contentEl.value = document.getElementsByClassName(`-layout-content`)[0]
  unref(contentEl) &&
  (unref(contentEl)).addEventListener('transitionend', contentResizeHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
  unref(contentEl) &&
  (unref(contentEl)).removeEventListener('transitionend', contentResizeHandler)
})

onActivated(() => {
  if (echartRef) {
    echartRef.resize()
  }
})

</script>
