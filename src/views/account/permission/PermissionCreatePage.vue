<template>
  <PageContainer>
    <Card class="max-w-screen-xl">
      <div class="grid grid-cols-3 gap-x-8 gap-y-4">
        <BaseInput v-model="formData.role" label="群組名稱" placeholder="請輸入群組名稱" />
        <div></div>
        <div></div>

        <!-- Permission Tree -->
        <div class="col-span-3">
          <h3 class="text-lg font-medium text-gray-800 mb-4">權限設定</h3>
          <PermissionTree
            :permission-data="formData"
            :permission-tree-config="permissionTreeConfig"
            :permission-labels="permissionLabels"
            @update-permission="updatePermissionValue"
            @toggle-all-children="toggleAllChildren"
            @toggle-all-section="toggleAllSection"
          />
        </div>

        <BaseSelect v-model="formData.status" label="帳號狀態" :options="[
          { label: '啟用', value: 'active' },
          { label: '暫停', value: 'suspended' },
          { label: '保留', value: 'reserved' },
        ]" />
        <div></div>
        <div></div>

        <!-- 按鈕區域 -->
        <div class="col-span-2 mt-8 flex justify-end gap-4">
          <IconButton @click="handleCancel" :icon="X" title="取消" :iconSize="32" variant="secondary" />
          <IconButton @click="handleCreate" :icon="Save" title="建立群組" :iconSize="32" variant="primary" />
        </div>
      </div>
    </Card>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from '@/components/common/PageContainer.vue'
import Card from '@/components/common/Card.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import IconButton from '@/components/common/IconButton.vue'
import PermissionTree from '@/components/common/PermissionTree.vue'
import { X, Save } from 'lucide-vue-next'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import type { PermissionForm } from './data/mockPermissionDetails'

const router = useRouter()

// 權限樹結構配置 (與 usePermission 中的配置相同)
const permissionTreeConfig = [
  {
    key: 'memberManagement',
    title: '會員帳號管理',
    items: [
      {
        key: 'teacherMember',
        label: '教師會員',
        permissions: ['view', 'add', 'edit', 'delete']
      },
      {
        key: 'studentMember',
        label: '學生會員',
        permissions: ['view', 'add', 'edit', 'delete']
      },
      {
        key: 'adminMember',
        label: '管理人員',
        permissions: ['view', 'add', 'edit', 'delete']
      },
      {
        key: 'groupInfo',
        label: '群組權限',
        permissions: ['view', 'add', 'edit', 'delete']
      }
    ]
  },
  {
    key: 'dataManagement',
    title: '資料管理',
    items: [
      {
        key: 'questionBank',
        label: '題庫管理',
        permissions: ['view', 'add', 'edit', 'delete', 'content', 'import']
      },
      {
        key: 'nearbyManagement',
        label: '班級管理',
        permissions: ['view', 'add', 'edit', 'delete', 'content']
      },
      {
        key: 'examManagement',
        label: '試題管理',
        permissions: ['view', 'add', 'edit', 'delete', 'content']
      },
      {
        key: 'documentManagement',
        label: '作文管理',
        permissions: ['view', 'add', 'edit', 'delete', 'content']
      }
    ]
  },
  {
    key: 'backendSettings',
    title: '後台設定',
    items: [
      {
        key: 'recommendationSystem',
        label: '推薦系統',
        permissions: ['view', 'add', 'edit', 'delete', 'content']
      },
      {
        key: 'systemAnnouncement',
        label: '系統公告',
        permissions: ['view', 'add', 'edit', 'delete', 'content']
      },
      {
        key: 'subscriptionSettings',
        label: '訂閱設定',
        permissions: ['view', 'add', 'edit', 'delete', 'content']
      }
    ]
  },
  {
    key: 'platformData',
    title: '平台數據',
    items: [
      {
        key: 'dataTemplate',
        label: '數據模板',
        permissions: [] // 單一權限，無子權限
      },
      {
        key: 'functionPageSettings',
        label: '功能頁面設定',
        permissions: [] // 單一權限，無子權限
      }
    ]
  }
]

// 權限標籤映射
const permissionLabels: Record<string, string> = {
  view: '查詢',
  add: '新增',
  edit: '編輯',
  delete: '刪除',
  content: '內容',
  import: '匯入'
}

const formData: Ref<Partial<PermissionForm>> = ref({
  role: '',
  content: {
    memberManagement: {
      teacherMember: {
        view: false,
        add: false,
        edit: false,
        delete: false,
      },
      studentMember: {
        view: false,
        add: false,
        edit: false,
        delete: false,
      },
      adminMember: {
        view: false,
        add: false,
        edit: false,
        delete: false,
      },
      groupInfo: {
        view: false,
        add: false,
        edit: false,
        delete: false,
      }
    },
    dataManagement: {
      questionBank: {
        view: false,
        add: false,
        edit: false,
        delete: false,
        content: false,
        import: false,
      },
      nearbyManagement: {
        view: false,
        add: false,
        edit: false,
        delete: false,
        content: false,
      },
      examManagement: {
        view: false,
        add: false,
        edit: false,
        delete: false,
        content: false,
      },
      documentManagement: {
        view: false,
        add: false,
        edit: false,
        delete: false,
        content: false,
      }
    },
    backendSettings: {
      recommendationSystem: {
        view: false,
        add: false,
        edit: false,
        delete: false,
        content: false,
      },
      systemAnnouncement: {
        view: false,
        add: false,
        edit: false,
        delete: false,
        content: false,
      },
      subscriptionSettings: {
        view: false,
        add: false,
        edit: false,
        delete: false,
        content: false,
      },
    },
    platformData: {
      dataTemplate: false,
      functionPageSettings: false
    }
  },
  status: 'active',
})

// 更新權限值的輔助函數
const updatePermissionValue = (path: string, value: boolean) => {
  if (!formData.value.content) return

  const pathParts = path.split('.')
  let current: any = formData.value.content

  for (let i = 0; i < pathParts.length - 1; i++) {
    current = current[pathParts[i]]
  }

  current[pathParts[pathParts.length - 1]] = value
}

// 切換某個路徑下的所有子權限
const toggleAllChildren = (basePath: string, checked: boolean) => {
  const [sectionKey, itemKey] = basePath.split('.')
  const section = permissionTreeConfig.find(s => s.key === sectionKey)
  const item = section?.items.find(i => i.key === itemKey)

  if (!item) return

  item.permissions.forEach(perm => {
    updatePermissionValue(`${basePath}.${perm}`, checked)
  })
}

// 切換整個區塊的所有權限
const toggleAllSection = (sectionKey: string, checked: boolean) => {
  const section = permissionTreeConfig.find(s => s.key === sectionKey)
  if (!section) return

  section.items.forEach(item => {
    if (item.permissions.length === 0) {
      updatePermissionValue(`${sectionKey}.${item.key}`, checked)
    } else {
      item.permissions.forEach(perm => {
        updatePermissionValue(`${sectionKey}.${item.key}.${perm}`, checked)
      })
    }
  })
}

// 取消操作
const handleCancel = () => {
  router.back()
}

// 建立群組
const handleCreate = async () => {
  // 這裡可以加入表單驗證邏輯
  if (!formData.value.role?.trim()) {
    alert('請輸入群組名稱')
    return
  }

  try {
    // 這裡應該調用 API 來創建新的權限群組
    console.log('創建權限群組:', formData.value)

    // 創建成功後導航回列表頁
    router.push('/account/permissions')
  } catch (error) {
    console.error('創建權限群組失敗:', error)
  }
}
</script>

