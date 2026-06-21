import { apiSlice } from "../../app/apiSlice";

const leaveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeaves: builder.query({
      query: ({ page = 1, limit = 3, status = "", search, category = "" }) =>
        `/leaves?page=${page}&limit=${limit}&status=${status}&search=${search}&category=${category}`,
      providesTags: ["Leave"],
    }),

    applyLeave: builder.mutation({
      query: (leaveData) => ({
        url: "/leaves",
        method: "POST",
        body: leaveData,
      }),
      invalidatesTags: ["Leave"],
    }),

    getLeaveById: builder.query({
      query: (id) => `/leaves/${id}`,
      providesTags: ["Leave"],
    }),

    updateLeaveStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/leaves/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Leave"],
    }),

    cancelLeave: builder.mutation({
      query: (id) => ({
        url: `/leaves/${id}/cancel`,
        method: "PUT",
      }),
      invalidatesTags: ["Leave"],
    }),
  }),
});

export const {
  useGetLeavesQuery,
  useApplyLeaveMutation,
  useGetLeaveByIdQuery,
  useUpdateLeaveStatusMutation,
  useCancelLeaveMutation,
} = leaveApiSlice;
