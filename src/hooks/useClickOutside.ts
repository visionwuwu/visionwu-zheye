import { ref, onMounted, onUnmounted, Ref } from 'vue'
/**
 * 点击的位置是否在当前元素里面
 * @param elementRef
 * @returns {Ref<boolean>}
 */
function useClickOutside (elementRef: Ref<HTMLElement | null>): Ref<boolean> {
  const isOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        isOutside.value = true
      } else {
        isOutside.value = false
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler, false)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler, false)
  })
  return isOutside
}
export default useClickOutside
