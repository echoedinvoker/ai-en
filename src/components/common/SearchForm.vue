<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="grid grid-cols-4 gap-4 mb-4">
      <!-- Email 搜尋 -->
      <FormInput
        v-model="localSearchForm.email"
        type="email"
        label="教師 Email"
        placeholder="輸入教師 Email"
        @update:modelValue="updateField('email', $event)"
      />

      <!-- 姓名搜尋 -->
      <FormInput
        v-model="localSearchForm.name"
        type="text"
        label="教師姓名"
        placeholder="輸入教師姓名"
        @update:modelValue="updateField('name', $event)"
      />

      <!-- 狀態搜尋 -->
      <FormInput
        v-model="localSearchForm.status"
        type="select"
        label="帳號狀態"
        :options="statusOptions"
        @update:modelValue="updateField('status', $event)"
      />

      <!-- 操作按鈕 -->
      <div class="flex items-end space-x-2">
        <button
          @click="handleSearch"
          class="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center cursor-pointer"
          title="搜尋"
        >
          <Search :size="20" />
        </button>

        <button
          v-if="showAddButton"
          @click="$emit('add')"
          class="px-4 py-2 bg-slate-600 text-white border border-slate-600 rounded-md hover:bg-slate-700 hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center cursor-pointer"
          title="新增教師"
        >
          <Plus :size="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Search, Plus } from 'lucide-vue-next'
import FormInput from './FormInput.vue'

interface SearchForm {
  email: string
  name: string
  status: string
}

interface Props {
  modelValue: SearchForm
  showAddButton?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: SearchForm): void
  (e: 'search', value: SearchForm): void
  (e: 'add'): void
}

const props = withDefaults(defineProps<Props>(), {
  showAddButton: true
})

const emit = defineEmits<Emits>()

// 本地搜尋表單狀態
const localSearchForm = ref<SearchForm>({ ...props.modelValue })

// 狀態選項
const statusOptions = [
  { value: 'ALL', label: '全部' },
  { value: 'active', label: '啟用中' },
  { value: 'suspended', label: '停權中' },
  { value: 'reserved', label: '保留' }
]

// 監聽 props 變化
watch(() => props.modelValue, (newValue) => {
  localSearchForm.value = { ...newValue }
}, { deep: true })

// 更新欄位值
const updateField = (field: keyof SearchForm, value: string) => {
  localSearchForm.value[field] = value
  emit('update:modelValue', { ...localSearchForm.value })
}

// 處理搜尋
const handleSearch = () => {
  emit('search', { ...localSearchForm.value })
}
</script>
