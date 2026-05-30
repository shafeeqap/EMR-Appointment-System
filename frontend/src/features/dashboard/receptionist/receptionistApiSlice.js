import { apiSlice } from "../../../app/apiSlice";

export const receptionistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReceptionistDashboard: builder.query({
      query: ({ id }) => `/receptionist/dashboard/${id}`,

      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetReceptionistDashboardQuery } = receptionistApiSlice;
