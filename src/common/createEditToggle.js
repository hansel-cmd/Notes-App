import { onMounted, onUnmounted, ref } from "vue";

export const useCreateEditToggle = (model) => {
  const enableNewGroupInput = ref(false);
  const isGroupOptionOpen = ref(false);
  const isBannerOptionOpen = ref(false);
  const dropdownRef = ref(null);

  const toggleDropdown = (_ref = "select", value) => {
    if (_ref === "groupNotes") {
      isGroupOptionOpen.value = !isGroupOptionOpen.value;
    } else if (_ref === "banner") {
      isBannerOptionOpen.value = !isBannerOptionOpen.value;
    }
    dropdownRef.value = value;
  };

  const handleSelectNewGroup = () => {
    enableNewGroupInput.value = true;
    model.group = "";
    setTimeout(() => {
      document.querySelector("#newGroup").focus();
    }, 0);
  };

  const handleSelectGroup = (value) => {
    model.group = value;

    // reset the other
    model.newGroup = "";
    enableNewGroupInput.value = false;
  };

  const handleSelectBanner = (value) => {
    model.banner = value;
  };

  const closeDropdownOnOutsideClick = (event) => {
    if (
      (isBannerOptionOpen.value || isGroupOptionOpen.value) &&
      dropdownRef.value !== event.target.id
    ) {
      isGroupOptionOpen.value = false;
      isBannerOptionOpen.value = false;
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
    enableNewGroupInput,
    isGroupOptionOpen,
    isBannerOptionOpen,
    dropdownRef,
    toggleDropdown,
    handleSelectNewGroup,
    handleSelectGroup,
    handleSelectBanner,
    closeDropdownOnOutsideClick,
  };
};
