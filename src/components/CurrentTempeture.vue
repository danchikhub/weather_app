<template>
  <div class="current-temperature">
    <div class="current-temperature__icon-container">
      <div
        class="current-temperature__icon"
        :style="{
          backgroundImage: 'url(' + weather.current?.condition?.icon + ')',
        }"
      ></div>
    </div>
    <div class="current-temperature__content-container">
      <div class="current-temperature__value">
        {{
          isFarin
            ? Math.round(weather.current?.temp_f)
            : Math.round(weather.current?.temp_c)
        }}
        {{ isFarin ? `&deg;F` : `&deg;C` }}
      </div>
      <div class="current-temperature__summary">
        {{ $t("feelslike") }}:
        {{
          isFarin
            ? Math.round(weather.current?.feelslike_f)
            : Math.round(weather.current?.feelslike_c)
        }}
        {{ isFarin ? `&deg;F` : `&deg;C` }}
      </div>
      <div class="current-temperature__summary">
        {{ weather.current?.condition?.text }}
      </div>
    </div>
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
    isFarin: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
<style>
.current-temperature {
  display: flex;
  margin-top: 0.25em;
  width: 100%;
}

.current-temperature__icon-container {
  flex-grow: 1.25;
  text-align: center;
  display: flex;
  justify-content: center;
}

.current-temperature__content-container {
  flex-grow: 1;
  text-align: center;
}

.current-temperature__icon {
  width: 8em;
  height: 8em;
  background-image: url("http://cdn.weatherapi.com/weather/64x64/day/176.png");
  background-size: cover;
}

.current-temperature__value {
  font-size: 5.25em;
  font-weight: 300;
}

.current-temperature__summary {
  margin-top: -0.5em;
  margin-left: -0.6em;
  text-align: center;
  font-size: 1.125em;
}
.current-temperature__summary:first-child {
  margin-top: -0.1em;
}
</style>
