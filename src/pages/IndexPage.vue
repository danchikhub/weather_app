<template>
  <div class="spinner" v-if="isLoadingAllData">
    <q-spinner color="light-blue-1" size="3em" />
  </div>
  <main
    v-else-if="!isLoadingAllData && current && forecast"
    class="main-container"
  >
    <div class="header">
      <div class="header__block">
        <q-select
          v-model="cityModel"
          use-input
          :label="$t('select_city')"
          label-color="white"
          popup-content-class="test"
          input-class="input-class"
          color="white"
          filled
          :options="cities"
          :option-value="(city) => city.name"
          :option-label="(city) => city.name"
          style="width: 220px"
          @filter="filterFn"
          @update:model-value="showCity"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div>
        <q-select
          v-model="locale"
          :options="localeOptions"
          :label="$t('select_lang')"
          label-color="white"
          popup-content-class="test"
          input-class="input-class"
          filled
          borderless
          emit-value
          map-options
          options-dense
          style="width: 220px"
          @update:model-value="switchLang"
        />
      </div>
      <div>
        {{ $t("farin") }}:
        <q-toggle
          v-model="isFarin"
          color="green"
          @update:model-value="switchGradus"
        />
      </div>
      <div>
        {{ $t("dark_theme") }}:
        <q-toggle
          v-model="darkModel"
          color="green"
          @update:model-value="switchDarkMode"
        />
      </div>
    </div>
    <div v-if="!isLocationWeather" class="main-container">
      <div class="location-and-date">
        <h1 class="location-and-date__location">
          {{ location?.name }}
        </h1>
        <div>{{ $t("now") }}</div>
      </div>
      <div class="current-temperature">
        <div class="current-temperature__icon-container">
          <div
            class="current-temperature__icon"
            :style="{
              backgroundImage: 'url(' + current?.condition?.icon + ')',
            }"
          ></div>
        </div>
        <div class="current-temperature__content-container">
          <div class="current-temperature__value">
            {{
              isFarin
                ? Math.round(current?.temp_f)
                : Math.round(current?.temp_c)
            }}
            &deg;C
          </div>
          <div class="current-temperature__summary">
            {{ $t("feelslike") }}:
            {{
              isFarin
                ? Math.round(current?.feelslike_f)
                : Math.round(current?.feelslike_c)
            }}
            &deg;C
          </div>
          <div class="current-temperature__summary">
            {{ current?.condition?.text }}
          </div>
        </div>
      </div>
      <div class="current-stats">
        <div v-if="forecast.forecastday">
          <div class="current-stats__value">
            {{
              isFarin
                ? Math.round(forecast?.forecastday[0]?.day?.maxtemp_f)
                : Math.round(forecast?.forecastday[0]?.day?.maxtemp_c)
            }}&deg;C
          </div>
          <div class="current-stats__label">{{ $t("high") }}</div>
          <div class="current-stats__value">
            {{
              isFarin
                ? Math.round(forecast?.forecastday[0]?.day?.mintemp_f)
                : Math.round(forecast?.forecastday[0]?.day?.mintemp_c)
            }}&deg;C
          </div>
          <div class="current-stats__label">{{ $t("low") }}</div>
        </div>
        <div>
          <div class="current-stats__value">
            {{ current?.wind_dir }}
          </div>
          <div class="current-stats__label">{{ $t("wind_direction") }}</div>
          <div class="current-stats__value">
            {{ Math.round(current?.wind_kph) }} {{ $t("kph") }}
          </div>
          <div class="current-stats__label">{{ $t("wind_speed") }}</div>
        </div>
        <div>
          <div class="current-stats__value">
            {{ current?.humidity }}
          </div>
          <div class="current-stats__label">{{ $t("humidity") }}</div>
          <div class="current-stats__value">
            {{ Math.round(current?.pressure_mb) }} {{ $t("gpa") }}
          </div>
          <div class="current-stats__label">{{ $t("pressure") }}</div>
        </div>
      </div>
    </div>
    <div class="spinner_test" v-else="isLocationWeather">
      <q-spinner color="light-blue-1" size="3em" />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";
import { ICurrent, IForecast, ILocation, ITemp, ICity } from "src/types";
export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      current: {} as ICurrent | null,
      forecast: {} as IForecast | null,
      location: {} as ILocation | null,
      cities: [],
      citiesFilter: [],
      darkModel: false,
      isFarin: false,
      temp: {} as ITemp,
      isLoadingAllData: false,
      isLocationWeather: false,
      cityModel: { name: "Bishkek" } as ICity | null,
      localeOptions: [
        { value: "en-US", label: "English" },
        { value: "ru-RU", label: "Русский" },
      ],
    };
  },
  setup() {
    const { locale } = useI18n({ useScope: "global" });
    const $q = useQuasar();
    const switchDarkMode = (value: boolean): void => {
      $q.dark.set(value);
    };
    return {
      switchDarkMode,
      locale,
    };
  },
  async mounted() {
    this.isLoadingAllData = true;
    Promise.all([
      await axios
        .get(
          "http://api.weatherapi.com/v1/forecast.json?key=28f041fa6062436682b85812231703&q=Bishkek&days=1&aqi=no&alerts=no&lang=en"
        )
        .then((response) => {
          this.current = response.data.current;
          this.forecast = response.data.forecast;
          this.location = response.data.location;
        }),
      await axios
        .get(
          "https://airlabs.co/api/v9/cities?lang=ru&api_key=a40525e8-b1e9-4874-b8ec-921f83f3d903"
        )
        .then((response) => {
          this.cities = response.data.response;
          this.citiesFilter = response.data.response;
        }),
    ]).then(() => {
      this.isLoadingAllData = false;
    });
  },
  methods: {
    filterFn(val: string, update: (callback: () => void) => void) {
      update((): void => {
        const needle = val.toLowerCase();
        this.cities = this.citiesFilter.filter((v: ICity) => {
          return v.name.toLowerCase().indexOf(needle) > -1;
        });
      });
    },
    switchGradus(val: boolean) {
      this.isFarin = val;
    },
    async showCity(val: ICity | null) {
      this.isLocationWeather = true;
      if (val == null) {
        await axios
          .get(
            `http://api.weatherapi.com/v1/forecast.json?key=28f041fa6062436682b85812231703&q=Bishkek&days=1&aqi=no&alerts=no&lang=en`
          )
          .then((response) => {
            this.current = response.data.current;
            this.forecast = response.data.forecast;
            this.location = response.data.location;
            this.isLocationWeather = false;
          });
      } else {
        await axios
          .get(
            `http://api.weatherapi.com/v1/forecast.json?key=28f041fa6062436682b85812231703&q=${val.name}&days=1&aqi=no&alerts=no&lang=en`
          )
          .then((response) => {
            this.current = response.data.current;
            this.forecast = response.data.forecast;
            this.location = response.data.location;
            this.isLocationWeather = false;
          });
      }
    },
    switchLang(val: string) {
      this.locale = val;
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

.test {
  color: #fff;
  background-color: #1a74c6;
}
.input-class {
  color: #fff;
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
  .main-container {
    padding: 10px 0;
    width: 880px;
    margin: 0 auto;
    font-size: 1.1em;
  }
}

/* location-and-date */
.location-and-date {
  width: 100%;
}

.location-and-date__location {
  margin: 0;
  font-size: 2em;
  font-weight: 600;
}

/* current-temperature */
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

/* current-stats */
.current-stats {
  display: flex;
  justify-content: space-around;
  padding-bottom: 1em;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}
@media screen and (max-width: 800px) {
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
  .current-stats {
    margin-bottom: 1em;
    padding-bottom: 0;
    border-top: none;
    border-bottom: none;
    border-left: 1px solid rgba(255, 255, 255, 0.5);
  }
}

.current-stats__value {
  margin-top: 1em;
  font-size: 1.44em;
}

.current-stats__label {
  color: rgba(255, 255, 255, 0.6);
}
@media screen and (max-width: 730px) {
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
  .current-temperature,
  .current-stats {
    width: 50%;
  }
}
@media screen and (max-width: 400px) {
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
  .current-temperature__value {
    font-size: 3.5em;
    font-weight: 300;
  }
  .current-stats__value {
    font-size: 1.3em;
  }
}
</style>
