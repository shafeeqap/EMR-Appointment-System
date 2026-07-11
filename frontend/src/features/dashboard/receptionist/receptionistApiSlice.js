import { apiSlice } from "../../../app/apiSlice";

export const receptionistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReceptionistDashboard: builder.query({
      query: () => "/receptionist/dashboard",

      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetReceptionistDashboardQuery } = receptionistApiSlice;
