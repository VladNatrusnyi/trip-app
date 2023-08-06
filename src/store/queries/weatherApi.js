import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

const baseURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`

const API_KEY = 'HWVRUDWJQF2HM2MWFEM8JB97N'

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    headers : {
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }),

  endpoints: builder => ({
    getWeather: builder.query({
      query: (tripData) => ({
        url: `${tripData.coordinates}/${tripData.startDate}/${tripData.endDate}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json&iconSet=icons2`
      }),
      transformResponse: (response) => ({
        weather: response.days.map(dayWeather => {
          return {
            id: Date.now().toString(),
            datetime: dayWeather.datetime,
            icon: dayWeather.icon,
            tempmax: dayWeather.tempmax,
            tempmin: dayWeather.tempmin,
          }
        })
        })
      },
    ),


    getTodayWeather: builder.query({
        query: (coordinates) => ({
          url: `${coordinates}/today?unitGroup=metric&include=days&key=${API_KEY}&contentType=json&iconSet=icons2`
        }),
        transformResponse: (response) => ({
          weather: response.days.map(dayWeather => {
            return {
              id: Date.now().toString(),
              datetime: dayWeather.datetime,
              icon: dayWeather.icon,
              tempmax: dayWeather.tempmax,
              tempmin: dayWeather.tempmin,
              temp: dayWeather.temp
            }
          })
        })
      },
    ),
  })
})



export const {
  useGetWeatherQuery,
  useGetTodayWeatherQuery
} = weatherApi
