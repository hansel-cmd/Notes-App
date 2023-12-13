import { computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

export const useFormValidation = (model) => {
  const rules = computed(() => ({
    banner: { required },
    title: { required, minLength: minLength(4) },
    content: { required },
  }));

  const $v = useVuelidate(rules, model);

  return {
    $v,
  };
};
