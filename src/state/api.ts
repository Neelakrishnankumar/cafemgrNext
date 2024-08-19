import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface productCate {
  WeekDays: number;
  SalesValue: string;
  SlNo: number;
}

interface weekdays {
  data: productCate[];
}

interface yearSlase {
  DB_Y2DSALESBLOCK3: string;
  DB_Y2DSALESBLOCK5: string;
  DB_Y2DSALESBLOCK9: string;
  DB_M2DSALESBLOCK3: string;
  DB_M2DSALESBLOCK5: string;
  DB_M2DSALESBLOCK9: string;
  DB_W2DSALESBLOCK3: string;
  DB_W2DSALESBLOCK5: string;
  DB_W2DSALESBLOCK9: string;
  DB_LWDSALESBLOCK3: string;
  DB_LWDSALESBLOCK5: string;
  DB_LWDSALESBLOCK9: string;
}

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZGY1OWM2MjQ4ZWE3Y2Y5MjExM2M0NWM5YmJjMGE4NTFhNjI3NDdhN2U3MWNlZTFmYWI2NmQzNjFkZTFiOWQ2NDUyY2I1YmU3MTA1NGJkNTgiLCJpYXQiOjE3MjI4NDk3NjguNzIzOTExLCJuYmYiOjE3MjI4NDk3NjguNzIzOTE2LCJleHAiOjE3NTQzODU3NjcuODY3Nzk1LCJzdWIiOiIxMSIsInNjb3BlcyI6W119.LjLzqk_fnDYPK68u9s66iyLZzwIHOTU5VCLU0cKAbtoAZDkig6N3CFE4GdQzy3wsM5zEfQmL7l7WlUIkqc_Je4j10Yg173p_uilOUjXibPhT18-MEn5UX6m-SwTsMy8GVL5OKDuPHgz88LY836MD3NAr8UKjkOdSBZ8XeN_fWMMDjRnMkqE7na9phBEEbKDsH7DcSLeb97IBCnetwtOUlqGpdxz0TZPVG0d4vz7I5EfWnPHJhDJjPCOYBo-WHwr-NvNOQPgcKmuLn5rKVFLOAse7s0ACqCH6RNVusXv_uy37Nh3Q_hk4cTIWeGSc2Fbk0OikzCC5WRTSbzGyEql7G7nVLRuVzPXdoiWwE3tppHtavdcQOW9bY0by6AgoPl3lohIWe1R9lAp-5LEOezxIxIA78Y2bI-dq_uqAHdxtfVKI6UDNqbRow8ssGe_mzzmm_NDHXcUgZb9rz_idfZgACIXmoViZgZSY3gTtQOx7xicE81v4zek0S6oW4Z-OBNNWxrWmhGkedbv4J0gyqWCIc-hX2_1uCmAyW8_87MhFu5gMd95bls-09pZsJVYbnuzLfALnOgbrTuB-IRaFxswQX4elAImtxI-obQ7iGD8u2lw3WOmrWQFI-WlBLBQ-WF2BQ5Q7q5rGN9kRSArwCj33ItV7gWPOuOXDQAtiAaSOGNk';
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://cafemgrlapi.beyondexs.com',
    headers: { Authorization: `Bearer ${token}` },
  }),
  reducerPath: 'api',
  tagTypes: ['ProductsCate', 'weekdays', 'topcards'],
  endpoints: (build) => ({
    // dashboard product analysis category get endpoints function
    getProductCateMetrics: build.query<[], void>({
      query: () => '/api/get/saleshistory',
      providesTags: ['ProductsCate'],
    }),
    // dashboard product analysis category get endpoints function
    getWeekDaysMetrics: build.query<weekdays, void>({
      query: () => `/api/get/saleshistory/daywisesales`,
      providesTags: ['weekdays'],
    }),
    getYearMonthWeekMetrics: build.query<yearSlase[], void>({
      query: () => `/api/get/dashbord`,
      providesTags: ['topcards'],
    }),
  }),
});

export const { useGetProductCateMetricsQuery, useGetWeekDaysMetricsQuery, useGetYearMonthWeekMetricsQuery } = api;
