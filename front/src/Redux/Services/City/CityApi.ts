import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICity } from './Interfaces/ICity';
import { ICityState } from './Interfaces/ICityState';

/**
 * Query for the city API
 */
export const CityApi = createApi({
  // The API Identifier
  reducerPath: 'city',
  // retrieve the base URL of the API from env variables
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE }),
  // Register endpoints of the api
  endpoints: (builder) => ({
    // search endpoint, retrieve cities matching the search term
    searchCity: builder.query<ICityState, string>({
      // query part to add after the API base URL for joining the endpoint
      query: (search) => `/city/search?q=${search}`,
      // transform the response to dispatch cities in 'metropolis' or 'overseas' arrays
      transformResponse: (response: ICity[]): ICityState => {
        /**
         * We can distinguish between metropolis and overseas cities by checking the 2 firsts chars of postal code.
         * If the postal code begins by 97 or 98, it's a overseas city.
         * else, it's a metropolis city.
         * @see https://fr.wikipedia.org/wiki/Code_postal_en_France#France_d'outre-mer for details on french postal codes
         */
        return {
          metropolis: response.filter((city: ICity) => !city.postalCode.match(/^9[7,8]\d{3}/)) || [],
          overseas: response.filter((city: ICity) => city.postalCode.match(/^9[7,8]\d{3}/)) || []
        }
      },
    })
  })
})

/**
 * Extract and export LazySearchCityQuery hook from the Query API
 */
export const { useLazySearchCityQuery } = CityApi;