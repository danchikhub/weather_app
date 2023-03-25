<template>
  <div class="spinner" v-if="isLoadingData">
    <q-spinner color="light-blue-1" size="3em" />
  </div>
  <main v-else-if="!isLoadingData && weather" class="main-container">
    <div class="header">
      <city-select
        :model-city="cityModel == null ? { name: 'Bishkek' } : cityModel"
        @selectCity="showCity"
      />
      <language-select />
      <gradus-toggle :fahreheit="isFarin" @switchGr="switchGradus" />
      <dark-theme-toggle />
    </div>
    <div v-if="!isLocationWeather" class="main-container">
      <location :weather="weather" />
      <current-tempeture :weather="weather" :is-farin="isFarin" />
      <current-stats :weather="weather" :is-farin="isFarin" />
    </div>
    <div class="spinner_test" v-else="isLocationWeather">
      <q-spinner color="light-blue-1" size="3em" />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ICity } from "src/types";
import DarkThemeToggle from "src/components/DarkThemeToggle.vue";
import GradusToggle from "src/components/GradusToggle.vue";
import LanguageSelect from "src/components/LanguageSelect.vue";
import CitySelect from "src/components/CitySelect.vue";
import Location from "src/components/Location.vue";
import CurrentTempeture from "src/components/CurrentTempeture.vue";
import CurrentStats from "src/components/CurrentStats.vue";
import { useData } from "../hooks/useData";
import { useWeatherInCity } from "src/hooks/useWeatherInCity";
export default defineComponent({
  name: "IndexPage",
  components: {
    DarkThemeToggle,
    GradusToggle,
    LanguageSelect,
    CitySelect,
    Location,
    CurrentTempeture,
    CurrentStats,
  },
  data() {
    return {
      isFarin: false,
      isLoadingAllData: false,
      isLocationWeather: false,
      cityModel: { name: "Bishkek" } as ICity | null,
    };
  },
  setup() {
    const { weather, cities, citiesFilter, isLoadingData } = useData();
    return {
      isLoadingData,
      weather,
      cities,
      citiesFilter,
    };
  },
  methods: {
    switchGradus(val: boolean) {
      this.isFarin = val;
    },
    async showCity(val: ICity | null) {
      this.isLocationWeather = true;
      await useWeatherInCity(val).then((result) => {
        const { weather, isLoadingWeatherInCity } = result;
        this.weather = weather;
        this.isLocationWeather = isLoadingWeatherInCity.value;
      });
    },
  },
});
</script>
<style>
.header {
  flex-basis: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.main-container {
  display: flex;
  flex-wrap: wrap;
  padding: 0 12px;
}
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.spinner_test {
  flex-basis: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
@media screen and (min-width: 920px) {
  .test {
    color: #fff;
    background-color: #1a74c6;
  }
  .main-container {
    padding: 10px 0;
    width: 880px;
    margin: 0 auto;
    font-size: 1.1em;
  }
}

@media screen and (max-width: 800px) {
  .test {
    color: #fff;
    background-color: #1a74c6;
  }
  .header {
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .header__block {
    margin: 10px 0;
  }
}
@media screen and (min-width: 700px) {
  .test {
    color: #fff;
    background-color: #1a74c6;
  }
  .current-stats {
    margin-bottom: 1em;
    padding-bottom: 0;
    border-top: none;
    border-bottom: none;
    border-left: 1px solid rgba(255, 255, 255, 0.5);
  }
}

@media screen and (max-width: 730px) {
  .test {
    color: #fff;
    background-color: #1a74c6;
  }
  .current-temperature__summary {
    margin-top: -0.1em;
  }
  .current-temperature__value {
    font-size: 4em;
    font-weight: 300;
  }
}
.current-temperature__summary {
  margin-top: -0.5em;
  margin-left: -0.6em;
  text-align: center;
  font-size: 1.125em;
}
@media screen and (min-width: 700px) {
  .test {
    color: #fff;
    background-color: #1a74c6;
  }
  .current-temperature,
  .current-stats {
    width: 50%;
  }
}
@media screen and (max-width: 400px) {
  .test {
    color: #fff;
    background-color: #1a74c6;
  }
  .current-temperature__icon {
    width: 7em;
    height: 7em;
  }
  .current-temperature__value {
    font-size: 4em;
    font-weight: 300;
  }
  .current-temperature__summary {
    font-size: 1em;
  }
}
@media screen and (max-width: 340px) {
  .test {
    color: #fff;
    background-color: #1a74c6;
  }
  .current-temperature__value {
    font-size: 3.5em;
    font-weight: 300;
  }
  .current-stats__value {
    font-size: 1.3em;
  }
}
</style>
