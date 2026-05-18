import { apiSlice } from "../../../app/apiSlice";

export const adminDashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboardData: builder.query({
      query: () => "/admin/dashboard",

      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetAdminDashboardDataQuery } = adminDashboardApiSlice;
