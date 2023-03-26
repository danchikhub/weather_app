import axios from "axios";
import { ref, reactive } from "vue";
import { ICity, ICurrent, IForecast, ILocation } from "src/types";
export async function useWeatherInCity(
  city: ICity | null,
  lang: string = "en"
) {
  const weather = reactive({
    location: {} as ILocation,
    current: {} as ICurrent,
    forecast: {} as IForecast,
  });
  const isLoadingWeatherInCity = ref(true);
  if (city == null) {
    await axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=28f041fa6062436682b85812231703&q=Bishkek&days=1&aqi=no&alerts=no&lang=${lang}`
      )
      .then((response) => {
        const { location, current, forecast } = response.data;
        weather.current = current;
        weather.location = location;
        weather.forecast = forecast;
        isLoadingWeatherInCity.value = false;
      });
  } else {
    await axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=28f041fa6062436682b85812231703&q=${city.name}&days=1&aqi=no&alerts=no&lang=${lang}`
      )
      .then((response) => {
        const { location, current, forecast } = response.data;
        weather.current = current;
        weather.location = location;
        weather.forecast = forecast;
        isLoadingWeatherInCity.value = false;
      });
  }
  return { weather, isLoadingWeatherInCity };
}
