import axios from "axios";
import { ref, reactive, onMounted } from "vue";
import { ICurrent, IForecast, ILocation } from "src/types";
interface IWeather {
  location: {};
  current: {};
  forecast: {};
}

export function useData() {
  const weather = reactive({
    location: {} as ILocation,
    current: {} as ICurrent,
    forecast: {} as IForecast,
  });
  const cities = ref([]);
  const citiesFilter = ref([]);
  const isLoadingData = ref(true);
  const fetching = async () => {
    try {
      Promise.all([
        await axios
          .get(
            "http://api.weatherapi.com/v1/forecast.json?key=28f041fa6062436682b85812231703&q=Bishkek&days=1&aqi=no&alerts=no&lang=en"
          )
          .then((response) => {
            const { location, current, forecast } = response.data;
            weather.current = current;
            weather.location = location;
            weather.forecast = forecast;
          }),
        await axios
          .get(
            "https://airlabs.co/api/v9/cities?lang=ru&api_key=a40525e8-b1e9-4874-b8ec-921f83f3d903"
          )
          .then((response) => {
            cities.value = response.data.response;
            citiesFilter.value = response.data.response;
          }),
      ]).then(() => (isLoadingData.value = false));
    } catch {
      alert("error");
    }
  };
  onMounted(fetching);
  // fetching();
  return {
    weather,
    cities,
    citiesFilter,
    isLoadingData,
  };
}
