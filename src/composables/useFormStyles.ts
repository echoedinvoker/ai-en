import { computed } from 'vue'

export function useFormStyles(props: {
  disabled?: boolean
  error?: string
  height?: string
}) {
  const inputClasses = computed(() => {
    const baseClasses = `bg-gray-50 border text-gray-900 disabled:text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${props.height || ''}`

    if (props.disabled) {
      return `${baseClasses} border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed`
    }

    if (props.error) {
      return `${baseClasses} border-red-300 focus:ring-red-500 focus:border-red-500`
    }

    return `${baseClasses} border-gray-300`
  })

  // 修正 label 樣式
  const labelClasses = computed(() =>
    'block text-sm font-medium text-gray-900 mb-2'
  )

  const errorClasses = computed(() =>
    'mt-1 text-sm text-red-600'
  )

  return {
    inputClasses,
    labelClasses,
    errorClasses
  }
}

