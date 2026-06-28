import { apiSlice } from "../../app/apiSlice";

const appointmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableSlots: builder.query({
      query: ({ doctorId, date }) =>
        `/appointments/slots?doctorId=${doctorId}&date=${date}`,

      providesTags: ["Appointment"],
    }),

    getAppointments: builder.query({
      query: ({ page = 1, limit = 5, search, date, status }) =>
        `/appointments?page=${page}&limit=${limit}&search=${search}&date=${date}&status=${status}`,

      providesTags: ["Appointment"],
    }),

    getAppointmentById: builder.query({
      query: ({ id }) => `/appointments/${id}`,

      providesTags: ["Appointment"],
    }),

    getAppointmentDetails: builder.query({
      query: ({ id, page = 1, limit = 5 }) =>
        `/appointments/${id}/details?page=${page}&limit=${limit}`,

      providesTags: ["Appointment"],
    }),

    createAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: "/appointments",
        method: "POST",
        body: appointmentData,
      }),
      invalidatesTags: ["Appointment"],
    }),

    updateAppointment: builder.mutation({
      query: ({ id, appointmentData }) => ({
        url: `/appointments/${id}/reschedule`,
        method: "PUT",
        body: appointmentData,
      }),
      invalidatesTags: ["Appointment"],
    }),

    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `/appointments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Appointment"],
    }),

    updateAppointmentStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/appointments/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Appointment", "Dashboard"],
    }),

    startConsultation: builder.mutation({
      query: ({ appointmentId, doctorId, date }) => ({
        url: `/appointments/start-consultation`,
        method: "PATCH",
        body: { appointmentId, doctorId, date },
      }),
      invalidatesTags: ["Appointment", "Dashboard"],
    }),
  }),
});

export const {
  useGetAvailableSlotsQuery,
  useGetAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useGetAppointmentDetailsQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
  useUpdateAppointmentStatusMutation,
  useStartConsultationMutation,
} = appointmentApiSlice;
