import axios from "axios";
import { ref, reactive } from "vue";

export default function () {
  const cities = ref([]);
  const citiesFilter = ref([]);
  const fetching = async () => {
    await axios
      .get(
        "https://airlabs.co/api/v9/cities?lang=ru&api_key=a40525e8-b1e9-4874-b8ec-921f83f3d903"
      )
      .then((response) => {
        cities.value = response.data.response;
        citiesFilter.value = response.data.response;
      });
  };
  fetching();
  return {
    cities,
    citiesFilter,
  };
}
