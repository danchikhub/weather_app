<template>
  <div class="location-and-date">
    <h1 class="location-and-date__location">
      {{ weather.location.name }}
    </h1>
    <div>{{ $t("now") }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    weather: {
      type: Object,
      required: true,
    },
  },
});
</script>
<style>
.location-and-date {
  width: 100%;
}

.location-and-date__location {
  margin: 0;
  font-size: 2em;
  font-weight: 600;
}
</style>
