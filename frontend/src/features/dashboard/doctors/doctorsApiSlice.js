import { apiSlice } from "../../../app/apiSlice";

export const doctorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: ({ page = 1, limit = 5, search = "", status = "" }) =>
        `/doctors?page=${page}&limit=${limit}&search=${search}&status=${status}`,

      providesTags: ["Doctor"],
    }),

    searchDoctor: builder.query({
      query: (searchTerm) => ({
        url: "/doctors/search",
        params: { search: searchTerm },
      }),

      transformResponse: (response) => response.doctors,

      keepUnusedDataFor: 60,
    }),

    createDoctor: builder.mutation({
      query: (doctorData) => ({
        url: "/doctors",
        method: "POST",
        body: doctorData,
      }),
      invalidatesTags: ["Doctor"],
    }),

    getDoctorById: builder.query({
      query: (id) => `/doctors/${id}`,
      providesTags: ["Doctor"],
    }),

    updateDoctor: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/doctors/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Doctor"],
    }),

    updateDoctorStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/doctors/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Doctor"],
    }),

    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `/doctors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doctor"],
    }),

    getDoctorDashboardData: builder.query({
      query: () => "/dcotor/dashboard",

      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useCreateDoctorMutation,
  useSearchDoctorQuery,
  useGetDoctorByIdQuery,
  useUpdateDoctorMutation,
  useUpdateDoctorStatusMutation,
  useDeleteDoctorMutation,
  useGetDoctorDashboardDataQuery,
} = doctorApiSlice;
