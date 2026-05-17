import { apiSlice } from "../../services/apiSlice";

export const auditApiSlice =
  apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getLoginAudits: builder.query({
        query: (params = {}) => ({
          url: "/audits/login",
          params,
        }),
        providesTags: ["Audit"],
      }),
    }),
  });

export const {
  useGetLoginAuditsQuery,
} = auditApiSlice;
