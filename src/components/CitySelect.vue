<template>
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
      @update:model-value="selectCity"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>
<script lang="ts">
import useCities from "src/hooks/useCities";
import { ICity } from "src/types";
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    modelCity: {
      type: Object,
    },
  },
  data() {
    return {
      cityModel: this.modelCity,
    };
  },
  setup() {
    const { cities, citiesFilter } = useCities();
    return {
      cities,
      citiesFilter,
    };
  },
  methods: {
    filterFn(
      val: string,
      update: (callback: () => void | undefined) => void | undefined
    ) {
      update((): void => {
        const needle = val.toLowerCase();
        this.cities = this.citiesFilter.filter((v: ICity) => {
          return v.name.toLowerCase().indexOf(needle) > -1;
        });
      });
    },
    selectCity() {
      this.$emit("selectCity", this.cityModel);
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
