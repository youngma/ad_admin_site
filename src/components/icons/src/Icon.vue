<template>
  <ElIcon :class="prefixCls" :size="size" :color="color">
    <svg v-if="isLocal" aria-hidden="true">
      <use :xlink:href="symbolId" />
    </svg>
    <Icon v-else :icon="icon" :style="getIconifyStyle" />
  </ElIcon>
</template>

<script setup>
import { computed, unref } from 'vue'
import { useDesign } from '@/hooks/web/useDesign.js'
import { Icon } from '@iconify/vue'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('icon')

const props = defineProps({
  // icon name
  icon: {
    type: String,
    required: false
  },
  // icon color
  color: {
    type: String,
    required: false
  },
  // icon size
  size: {
    type: Number,
    required: false,
    default: 20
  },
  hoverColor: {
    type: String,
    required: false
  }
})

const isLocal = computed(() => props.icon.startsWith('svg-icon:'))

const symbolId = computed(() => {
  return unref(isLocal) ? `#icon-${props.icon.split('svg-icon:')[1]}` : props.icon
})

const getIconifyStyle = computed(() => {
  const { color, size } = props
  return {
    fontSize: `${size}px`,
    color
  }
})
</script>

<style lang="less" scoped>
@prefix-cls: ~'el-icon';

.@{prefix-cls},
.iconify {
  &:hover {
    :deep(svg) {
      // stylelint-disable-next-line
      color: v-bind(hoverColor) !important;
    }
  }
}
</style>
