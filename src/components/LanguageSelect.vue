<template>
  <div>
    <q-select
      v-model="locale"
      :options="localeOptions"
      :label="$t('select_lang')"
      label-color="white"
      popup-content-class="test"
      input-class="input-class"
      popup-content-style="background-color:#1a74c6"
      filled
      borderless
      emit-value
      map-options
      options-dense
      style="width: 220px"
      @update:model-value="switchLang"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
export default defineComponent({
  data() {
    return {
      localeOptions: [
        { value: "en-US", label: "English" },
        { value: "ru-RU", label: "Русский" },
      ],
    };
  },
  setup() {
    const { locale } = useI18n({ useScope: "global" });
    return {
      locale,
    };
  },
  methods: {
    switchLang(val: string) {
      this.locale = val;
    },
  },
});
</script>
<style>
.input-class {
  color: #fff;
}
.test {
  color: #fff;
  background-color: #1a74c6;
}
</style>
