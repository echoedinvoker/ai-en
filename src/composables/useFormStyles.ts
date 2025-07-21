import { computed } from 'vue'

export function useFormStyles(props: {
  disabled?: boolean
  error?: string
  height?: string
  dense?: boolean // 新增 dense 屬性
}) {
  const inputClasses = computed(() => {
    // 根據 dense 模式調整 padding 和 text size
    const sizeClasses = props.dense
      ? 'text-xs p-1.5' // dense: 較小的 padding 和字體
      : 'text-sm p-2.5' // normal: 原本的大小

    const baseClasses = `bg-gray-50 border text-gray-900 disabled:text-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ${sizeClasses} ${props.height || ''}`

    if (props.disabled) {
      return `${baseClasses} border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed`
    }

    if (props.error) {
      return `${baseClasses} border-red-300 focus:ring-red-500 focus:border-red-500`
    }

    return `${baseClasses} border-gray-300`
  })

  const labelClasses = computed(() => {
    // dense 模式下使用較小的 label
    const sizeClasses = props.dense
      ? 'text-xs mb-1' // dense: 較小字體和間距
      : 'text-sm mb-2' // normal: 原本大小

    return `block font-medium text-gray-900 ${sizeClasses}`
  })

  const errorClasses = computed(() => {
    // dense 模式下使用較小的錯誤訊息
    const sizeClasses = props.dense ? 'text-xs' : 'text-sm'
    return `mt-1 ${sizeClasses} text-red-600`
  })

  const helperTextClasses = computed(() => {
    // dense 模式下使用較小的輔助文字
    const sizeClasses = props.dense ? 'text-xs' : 'text-sm'
    return `mt-1 ${sizeClasses} text-gray-500`
  })

  return {
    inputClasses,
    labelClasses,
    errorClasses,
    helperTextClasses
  }
}

