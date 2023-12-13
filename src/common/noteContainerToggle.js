import { onMounted, onUnmounted, ref } from "vue";

export const useNoteContainerToggle = () => {
  const isOpen = ref(false);
  const dropdownRef = ref(null);

  const toggleDropdown = (id) => {
    isOpen.value = !isOpen.value;
    dropdownRef.value = id;
  };

  const closeDropdownOnOutsideClick = (event) => {
    if (isOpen.value && dropdownRef.value !== event.target.id) {
      isOpen.value = false;
      dropdownRef.value = null;
    }
  };

  onMounted(() => {
    document.addEventListener("click", closeDropdownOnOutsideClick);
  });

  onUnmounted(() => {
    document.removeEventListener("click", closeDropdownOnOutsideClick);
  });

  return {
    isOpen,
    dropdownRef,
    toggleDropdown,
    closeDropdownOnOutsideClick,
  };
};
