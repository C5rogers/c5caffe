import { ref } from 'vue'
import ClipboardJS from 'clipboard'

export default useCopytoclipbord = () => {
    const is_copyed = ref(false)
    const copytoclipbord = (text) => {
        const clipbord = new ClipboardJS('.copy-button', {
            text: () => text
        })
        clipbord.on('success', () => {
            is_copyed.value = true
            setTimeout(() => {
                is_copyed.value = false
            }, 3000);
        })
        clipbord.on('error', () => {
            is_copyed.value = false
        })
        clipbord.onClick({ currentTarget: document.body })
    }
    return {
        is_copyed,
        copytoclipbord
    }
}