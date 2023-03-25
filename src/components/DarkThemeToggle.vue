<template>
  <div>
    {{ $t("dark_theme") }}:
    <q-toggle
      v-model="darkModel"
      color="green"
      @update:model-value="switchDarkMode"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
export default defineComponent({
  data() {
    return {
      darkModel: false,
    };
  },
  setup() {
    const $q = useQuasar();
    const switchDarkMode = (val: boolean): void => {
      $q.dark.set(val);
    };
    return {
      switchDarkMode,
    };
  },
});
</script>
