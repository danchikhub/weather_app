<template>
  <div class="current-stats">
    <div v-if="weather.forecast.forecastday">
      <div class="current-stats__value">
        {{
          isFarin
            ? Math.round(weather.forecast.forecastday[0].day.maxtemp_f)
            : Math.round(weather.forecast.forecastday[0].day?.maxtemp_c)
        }}
        {{ isFarin ? `&deg;F` : `&deg;C` }}
      </div>
      <div class="current-stats__label">{{ $t("high") }}</div>
      <div class="current-stats__value">
        {{
          isFarin
            ? Math.round(weather.forecast.forecastday[0].day.mintemp_f)
            : Math.round(weather.forecast.forecastday[0].day.mintemp_c)
        }}
        {{ isFarin ? `&deg;F` : `&deg;C` }}
      </div>
      <div class="current-stats__label">{{ $t("low") }}</div>
    </div>
    <div>
      <div class="current-stats__value">
        {{ weather.current?.wind_dir }}
      </div>
      <div class="current-stats__label">{{ $t("wind_direction") }}</div>
      <div class="current-stats__value">
        {{ Math.round(weather.current?.wind_kph) }} {{ $t("kph") }}
      </div>
      <div class="current-stats__label">{{ $t("wind_speed") }}</div>
    </div>
    <div>
      <div class="current-stats__value">
        {{ weather.current?.humidity }}
      </div>
      <div class="current-stats__label">{{ $t("humidity") }}</div>
      <div class="current-stats__value">
        {{ Math.round(weather.current?.pressure_mb) }} {{ $t("gpa") }}
      </div>
      <div class="current-stats__label">{{ $t("pressure") }}</div>
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
.current-stats {
  display: flex;
  justify-content: space-around;
  padding-bottom: 1em;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

.current-stats__value {
  margin-top: 1em;
  font-size: 1.44em;
}

.current-stats__label {
  color: rgba(255, 255, 255, 0.6);
}
</style>
