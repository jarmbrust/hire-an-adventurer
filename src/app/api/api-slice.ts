import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Adventurer, Monster } from '@/app/lib/definitions';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getAdventurers: builder.query<{ adventurers: Adventurer[] }, void>({
      query: () => 'adventurers-list',
    }),
    // setAdventurerStatus: builder.mutation<void, { id: number; status: AdventurerStatuses }>({
    //   query: ({ id, status }) => ({
    //     url: `adventurers/${id}`,
    //     method: 'PATCH',
    //     body: { status },
    //   }),
    // }),
    // setAdventurerCondition: builder.mutation<void, { id: number; condition: AdventurerConditions }>({
    //   query: ({ id, condition }) => ({
    //     url: `adventurers/${id}`,
    //     method: 'PATCH',
    //     body: { condition },
    //   }),
    // }),
  }),
});

export const monsterApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getMonsters: builder.query<{ monster: Monster }, { id: number }>({
      query: ({id}) => `monsters/${id}`,
    }),
  }),
});

export const { useGetMonstersQuery } = monsterApi;
export const { useGetAdventurersQuery } = api;
