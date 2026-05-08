import { apiSlice } from "../../app/apiSlice";

export const adminDashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => "/admin/dashboard",

      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardDataQuery } = adminDashboardApiSlice;
