<template>
  <div>
    <Icon :icon=icon></Icon>
    <span v-if="title">
         {{ title }}
    </span>
  </div>
</template>

<script>

export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  // render() {
  //   const { icon, title } = this.$props
  //   const vnodes = []
  //
  //   if (icon) {
  //     // if (icon.includes('el-icon')) {
  //     //   vnodes.push(`<i class={[icon, 'sub-el-icon']} />`)
  //     // } else {
  //     //   vnodes.push(`<svg-icon icon-class={icon} />`)
  //     // }
  //     vnodes.push(`<Icon icon={[icon]}></Icon>`)
  //   }
  //
  //   if (title) {
  //     vnodes.push(`<span slot="title">{title}</span>`)
  //   }
  //
  //   return vnodes
  // }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
