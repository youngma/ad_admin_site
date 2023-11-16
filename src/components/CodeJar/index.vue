<template>
  <div style="margin: 10px">
    <div class="editor language-javascript dark">
    </div>
  </div>
</template>

<script setup>
import { CodeJar } from 'codejar'
import { withLineNumbers } from 'codejar/linenumbers'
import Prism from 'prismjs'
import { computed, onMounted, ref, watch } from 'vue'

defineOptions({
  name: 'CodeJarEditor'
})

let codeJar = null;

const props = defineProps({
  jsonObject: {
    type: Object, Array,
    required: true
  }
})

const text = ref(props.jsonObject)
const code = computed(() => JSON.stringify(text.value, null, 2))
// const code = computed(() => 'p { color: red }')
//
watch(
  () => props.jsonObject,
  (options) => {
    codeJar.updateCode(JSON.stringify(props.jsonObject, null, 2))
  },
  {
    deep: true
  }
)

onMounted(() => {
  const options = {
    tab: ' '.repeat(4), // default is '\t'
    indentOn: /[(\[]$/, // default is /{$/
    readonly: true
  }

  codeJar = CodeJar(document.querySelector('.editor')
    , withLineNumbers(Prism.highlightElement)
    , options)

  codeJar.updateCode(JSON.stringify(props.jsonObject, null, 2))
})

</script>

<style lang="css">
@import "prismjs/themes/prism-dark.css"
</style>

<style lang="scss" scoped>

.editor {
  border-radius: 6px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  font-family: 'Source Code Pro', monospace;
  font-size: 14px;
  font-weight: 400;
  min-height: 340px;
  letter-spacing: normal;
  line-height: 20px;
  padding: 10px;
  tab-size: 4;
  height: 300px;
  width: 100%;
  overflow: hidden;
}
</style>
