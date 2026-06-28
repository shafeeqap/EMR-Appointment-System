import { apiSlice } from "../../app/apiSlice";

const patientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatient: builder.query({
      query: ({ page = 1, limit = 5, search }) =>
        `/patients?page=${page}&limit=${limit}&search=${search}`,

      providesTags: ["Patient"],
    }),

    searchPatient: builder.query({
      query: (searchTerm) => ({
        url: "/patients/search",
        params: { search: searchTerm },
      }),

      transformResponse: (response) => response.patients,

      keepUnusedDataFor: 60,
    }),

    getPatientDetails: builder.query({
      query: ({ id, page = 1, limit = 5 }) =>
        `/patients/${id}/details?page=${page}&limit=${limit}`,

      providesTags: ["Patient"],
    }),

    createPatient: builder.mutation({
      query: (patientData) => ({
        url: "/patients",
        method: "POST",
        body: patientData,
      }),
      invalidatesTags: ["Patient"],
    }),

    getPatientById: builder.query({
      query: (id) => `/patients/${id}`,
      providesTags: ["Patient"],
    }),

    updatePatient: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/patients/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Patient"],
    }),

    deletePatient: builder.mutation({
      query: (id) => ({
        url: `/patients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Patient"],
    }),
  }),
});

export const {
  useGetPatientQuery,
  useSearchPatientQuery,
  useGetPatientDetailsQuery,
  useCreatePatientMutation,
  useDeletePatientMutation,
  useUpdatePatientMutation,
  useGetPatientByIdQuery,
} = patientApiSlice;
