import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Adventurer, AdventurerStatuses } from '@/app/lib/definitions';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getAdventurers: builder.query<{ adventurers: Adventurer[] }, void>({
      query: () => 'adventurers-list',
    }),
    setAdventurerStatus: builder.mutation<void, { id: number; status: AdventurerStatuses }>({
      query: ({ id, status }) => ({
        url: `adventurers/${id}`,
        method: 'PATCH',
        body: { status },
      }),
    }),
  }),
});

export const { useGetAdventurersQuery } = api;
