import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Adventurer } from '@/app/lib/definitions';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getAdventurers: builder.query<{ adventurers: Adventurer[] }, void>({
      query: () => 'adventurers-list',
    }),
  }),
});
console.log('API slice created', api);
export const { useGetAdventurersQuery } = api;