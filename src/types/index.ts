export interface ICondition {
  text: string;
  icon: string;
}
export interface ILocation {
  name: string;
}
export interface IDay {
  day: {
    mintemp_c: number;
    mintemp_f: number;
    maxtemp_c: number;
    maxtemp_f: number;
  };
}
export interface IForecast {
  forecastday: [IDay];
}

export interface ICurrent {
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  wind_dir: string;
  wind_kph: number;
  pressure_mb: number;
  humidity: number;
  condition: ICondition;
}

export interface ITemp {
  temp: number;
  feelslike: number;
  mintemp: number;
  maxtem: number;
}
export interface ICity {
  name: string;
}
