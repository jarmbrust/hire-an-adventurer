import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Adventurer, Monster } from '@/app/lib/definitions';

export const adventurerApi = createApi({
  reducerPath: 'adventurerApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getAdventurers: builder.query<{ adventurers: Adventurer[] }, void>({
      query: () => 'adventurers-list',
    }),
  }),
});

export const monsterApi = createApi({
  reducerPath: 'monsterApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getMonsters: builder.query<{ monster: Monster }, { id: number }>({
      query: ({id}) => `monsters/${id}`,
    }),
  }),
});

export const { useGetMonstersQuery } = monsterApi;
export const { useGetAdventurersQuery } = adventurerApi;
