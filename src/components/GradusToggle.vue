<template>
  <div>
    {{ $t("farin") }}:
    <q-toggle v-model="isF" color="green" @update:model-value="swithGradus" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    fahreheit: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isF: this.fahreheit,
    };
  },
  methods: {
    swithGradus() {
      this.$emit("switchGr", this.isF);
    },
  },
});
</script>
