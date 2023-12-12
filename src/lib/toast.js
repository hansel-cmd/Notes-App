import { ref } from "vue";

export const toast = ref({
    show: false,
    message: ''
})

export const resetToast = () => {
    setTimeout(() => {
        toast.value.show = false;
        toast.value.message = '';
    }, 1500);
}