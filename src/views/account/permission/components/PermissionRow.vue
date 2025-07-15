<template>
  <div class="flex items-center justify-between py-2 border-b border-gray-100">
    <span class="text-sm font-medium text-gray-700 w-32">{{ title }}</span>
    <div class="flex items-center gap-6">
      <label class="flex items-center gap-2">
        <input
          type="checkbox"
          :checked="permissions.view"
          @change="$emit('update', 'view', $event.target.checked)"
          class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span class="text-sm text-gray-600">查詢</span>
      </label>
      <label class="flex items-center gap-2">
        <input
          type="checkbox"
          :checked="permissions.add"
          @change="$emit('update', 'add', $event.target.checked)"
          class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span class="text-sm text-gray-600">新增</span>
      </label>
      <label class="flex items-center gap-2">
        <input
          type="checkbox"
          :checked="permissions.edit"
          @change="$emit('update', 'edit', $event.target.checked)"
          class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span class="text-sm text-gray-600">編輯</span>
      </label>
      <label class="flex items-center gap-2">
        <input
          type="checkbox"
          :checked="permissions.delete"
          @change="$emit('update', 'delete', $event.target.checked)"
          class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span class="text-sm text-gray-600">刪除</span>
      </label>
      <label v-if="showContent" class="flex items-center gap-2">
        <input
          type="checkbox"
          :checked="permissions.content"
          @change="$emit('update', 'content', $event.target.checked)"
          class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span class="text-sm text-gray-600">內容</span>
      </label>
      <label v-if="showImport" class="flex items-center gap-2">
        <input
          type="checkbox"
          :checked="permissions.import"
          @change="$emit('update', 'import', $event.target.checked)"
          class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span class="text-sm text-gray-600">匯入</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  permissions: {
    view?: boolean
    add?: boolean
    edit?: boolean
    delete?: boolean
    content?: boolean
    import?: boolean
  }
  showContent?: boolean
  showImport?: boolean
}

defineProps<Props>()
defineEmits<{
  update: [field: string, value: boolean]
}>()
</script>

