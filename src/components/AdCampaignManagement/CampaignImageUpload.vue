<template>
  <el-upload
    v-model:file-list="uploadFiles"
    style="margin-left: 5px !important;"
    :action="dialogImageUrl"
    :headers="headers"
    list-type="picture-card"
    :limit=1
    :auto-upload="true"
    :on-preview="handlePictureCardPreview"
    :on-exceed="handleExceed"
    :before-remove="beforeRemove"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
  >
    <el-icon><Plus /></el-icon>
<!--    <template #file="{ file }">-->
<!--      <div>-->
<!--        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />-->
<!--        <span class="el-upload-list__item-actions">-->
<!--          <span-->
<!--            class="el-upload-list__item-preview"-->
<!--            @click="handlePictureCardPreview(file)"-->
<!--          >-->
<!--            <el-icon><zoom-in /></el-icon>-->
<!--          </span>-->
<!--        </span>-->
<!--      </div>-->
<!--    </template>-->
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>

</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue'
import { getToken } from '@/utils/auth'

import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const emit = defineEmits(['upload-after'])
const { files } = defineProps({
  files: {
    type: Array,
    default: [],
    required: false
  }
})

const uploadFiles = ref(files)

const dialogImageUrl = ref(import.meta.env.VITE_ADMIN_API + '/admin/v1/upload/campaign/files')
const headers = ref({ Authorization: getToken() })
const dialogVisible = ref(false)

const handleRemove = (file) => {
  uploadFiles.value = uploadFiles.value.filter((value, index, arr) => {
    const { originFileName } = value
    return originFileName !== file.name
  })

  emit('upload-after', { uploadFiles })
}

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

// const handleDownload = (file, uploadFiles) => {
//   console.log(file)
// }

const handleExceed = (files, uploadFiles) => {
  ElMessage.warning(
    '이미지는 1개만 업로드 가능 합니다.'
  )
}

const beforeRemove = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `${uploadFile.name} 파일을 삭제 하시겠습니까?`
  ).then(
    () => true,
    () => false
  )
}

const handleSuccess = (data, uploadFile, uploadFiles) => {
  // console.log(uploadFile)
  // console.log(uploadFiles)

  const { result } = data
  emit('upload-after', { result, uploadFiles })
}

function initUploader() {
  uploadFiles.value = []
}

defineExpose({
  initUploader
})

</script>

<style scoped lang="scss">

</style>
