import { apiSlice } from "../../app/apiSlice";

const departmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: ({ page = 1, limit = 5, search }) =>
        `/departments?page=${page}&limit=${limit}&search=${search}`,
      
      providesTags: ["Department"],
    }),

    createDepartment: builder.mutation({
      query: (departmentData) => ({
        url: "/departments",
        method: "POST",
        body: departmentData,
      }),
      invalidatesTags: ["Department"],
    }),

    getDepartmentById: builder.query({
      query: (id) => `/departments/${id}`,
      providesTags: ["Department"],
    }),

    updateDepartment: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/departments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Department"],
    }),

    updateDepartmentStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/departments/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Department"],
    }),

    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Department"],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useGetDepartmentByIdQuery,
  useUpdateDepartmentMutation,
  useUpdateDepartmentStatusMutation,
  useDeleteDepartmentMutation,
} = departmentApiSlice;
