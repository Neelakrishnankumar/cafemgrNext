import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface InitialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  status: string;
  isLoading: boolean;
  xaxis: [];
  yaxis: [];
  ProductCate: [];
  productPerformanceData: [];
  productPerformanceLoading: boolean;
  pLoading: boolean;
}

const initialState: InitialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
  status: 'idle',
  isLoading: false,
  xaxis: [],
  yaxis: [],
  ProductCate: [],
  pLoading: false,
  productPerformanceData: [],
  productPerformanceLoading: false,
};

export interface NewProduct {
  ToDate: string;
  FromDate: string;
  Limit: number;
  LocationID?: string;
}

export const fetchFastMovingChart = createAsyncThunk('app/fetchTopTenProduct', async (data: NewProduct) => {
  console.log('🚀 ~ data:', data);

  try {
    var url = 'http://cafemgr.benmoredata.com/api/ProductYearSales.php';

    //   console.log("get" + JSON.stringify(data));
    // console.log("🚀 ~ file: Formapireducer.js:26 ~ data:", data);
    const response = await axios.post(url, data, {
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk5ODQzNDl9.uxE3r3X4lqV_WKrRKRPXd-Jub9BnVcCXqCtLL4I0fpU',
      },
    });
    // console.log('🚀 ~ response:', response);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
});

export const getProductCateMetrics = createAsyncThunk('app/dashboard/productcategory', async () => {
  try {
    var url = 'https://cafemgrlapi.beyondexs.com/api/get/saleshistory';
    var token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZGY1OWM2MjQ4ZWE3Y2Y5MjExM2M0NWM5YmJjMGE4NTFhNjI3NDdhN2U3MWNlZTFmYWI2NmQzNjFkZTFiOWQ2NDUyY2I1YmU3MTA1NGJkNTgiLCJpYXQiOjE3MjI4NDk3NjguNzIzOTExLCJuYmYiOjE3MjI4NDk3NjguNzIzOTE2LCJleHAiOjE3NTQzODU3NjcuODY3Nzk1LCJzdWIiOiIxMSIsInNjb3BlcyI6W119.LjLzqk_fnDYPK68u9s66iyLZzwIHOTU5VCLU0cKAbtoAZDkig6N3CFE4GdQzy3wsM5zEfQmL7l7WlUIkqc_Je4j10Yg173p_uilOUjXibPhT18-MEn5UX6m-SwTsMy8GVL5OKDuPHgz88LY836MD3NAr8UKjkOdSBZ8XeN_fWMMDjRnMkqE7na9phBEEbKDsH7DcSLeb97IBCnetwtOUlqGpdxz0TZPVG0d4vz7I5EfWnPHJhDJjPCOYBo-WHwr-NvNOQPgcKmuLn5rKVFLOAse7s0ACqCH6RNVusXv_uy37Nh3Q_hk4cTIWeGSc2Fbk0OikzCC5WRTSbzGyEql7G7nVLRuVzPXdoiWwE3tppHtavdcQOW9bY0by6AgoPl3lohIWe1R9lAp-5LEOezxIxIA78Y2bI-dq_uqAHdxtfVKI6UDNqbRow8ssGe_mzzmm_NDHXcUgZb9rz_idfZgACIXmoViZgZSY3gTtQOx7xicE81v4zek0S6oW4Z-OBNNWxrWmhGkedbv4J0gyqWCIc-hX2_1uCmAyW8_87MhFu5gMd95bls-09pZsJVYbnuzLfALnOgbrTuB-IRaFxswQX4elAImtxI-obQ7iGD8u2lw3WOmrWQFI-WlBLBQ-WF2BQ5Q7q5rGN9kRSArwCj33ItV7gWPOuOXDQAtiAaSOGNk';

    //   console.log("get" + JSON.stringify(data));
    // console.log("🚀 ~ file: Formapireducer.js:26 ~ data:", data);
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    // console.log('🚀 ~ response:', response);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
});

export const getProductMetrics = createAsyncThunk('app/dashboard/product', async (id: number) => {
  try {
    var url = `https://cafemgrlapi.beyondexs.com/api/get/saleshistory/salesfilter/${id}`;
    var token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZGY1OWM2MjQ4ZWE3Y2Y5MjExM2M0NWM5YmJjMGE4NTFhNjI3NDdhN2U3MWNlZTFmYWI2NmQzNjFkZTFiOWQ2NDUyY2I1YmU3MTA1NGJkNTgiLCJpYXQiOjE3MjI4NDk3NjguNzIzOTExLCJuYmYiOjE3MjI4NDk3NjguNzIzOTE2LCJleHAiOjE3NTQzODU3NjcuODY3Nzk1LCJzdWIiOiIxMSIsInNjb3BlcyI6W119.LjLzqk_fnDYPK68u9s66iyLZzwIHOTU5VCLU0cKAbtoAZDkig6N3CFE4GdQzy3wsM5zEfQmL7l7WlUIkqc_Je4j10Yg173p_uilOUjXibPhT18-MEn5UX6m-SwTsMy8GVL5OKDuPHgz88LY836MD3NAr8UKjkOdSBZ8XeN_fWMMDjRnMkqE7na9phBEEbKDsH7DcSLeb97IBCnetwtOUlqGpdxz0TZPVG0d4vz7I5EfWnPHJhDJjPCOYBo-WHwr-NvNOQPgcKmuLn5rKVFLOAse7s0ACqCH6RNVusXv_uy37Nh3Q_hk4cTIWeGSc2Fbk0OikzCC5WRTSbzGyEql7G7nVLRuVzPXdoiWwE3tppHtavdcQOW9bY0by6AgoPl3lohIWe1R9lAp-5LEOezxIxIA78Y2bI-dq_uqAHdxtfVKI6UDNqbRow8ssGe_mzzmm_NDHXcUgZb9rz_idfZgACIXmoViZgZSY3gTtQOx7xicE81v4zek0S6oW4Z-OBNNWxrWmhGkedbv4J0gyqWCIc-hX2_1uCmAyW8_87MhFu5gMd95bls-09pZsJVYbnuzLfALnOgbrTuB-IRaFxswQX4elAImtxI-obQ7iGD8u2lw3WOmrWQFI-WlBLBQ-WF2BQ5Q7q5rGN9kRSArwCj33ItV7gWPOuOXDQAtiAaSOGNk';

    //   console.log("get" + JSON.stringify(data));
    // console.log("🚀 ~ file: Formapireducer.js:26 ~ data:", data);
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    // console.log('🚀 ~ response:', response);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
});

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsSidebarcollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      //FastMovingChart
      .addCase(fetchFastMovingChart.pending, (state, action) => {
        state.status = 'pending';
        state.isLoading = true;
        state.xaxis = [];
        state.yaxis = [];
      })
      .addCase(fetchFastMovingChart.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.isLoading = false;
        state.xaxis = action.payload.xaxis;
        state.yaxis = action.payload.yaxisValue;
      })

      .addCase(fetchFastMovingChart.rejected, (state, action) => {
        state.status = 'rejected';
        state.isLoading = false;
        state.xaxis = [];
        state.yaxis = [];
      })

      //Product Category
      .addCase(getProductCateMetrics.pending, (state, action) => {
        state.pLoading = true;
        state.ProductCate = [];
      })
      .addCase(getProductCateMetrics.fulfilled, (state, action) => {
        state.pLoading = false;
        state.ProductCate = action.payload.data;
      })

      .addCase(getProductCateMetrics.rejected, (state, action) => {
        state.pLoading = false;
        state.ProductCate = [];
      })
      //Product Category
      .addCase(getProductMetrics.pending, (state, action) => {
        state.productPerformanceLoading = true;
        state.productPerformanceData = [];
      })
      .addCase(getProductMetrics.fulfilled, (state, action) => {
        state.productPerformanceLoading = false;
        state.productPerformanceData = action.payload.data;
      })

      .addCase(getProductMetrics.rejected, (state, action) => {
        state.productPerformanceLoading = false;
        state.productPerformanceData = [];
      });
  },
});

export const { setIsDarkMode, setIsSidebarcollapsed } = globalSlice.actions;

export default globalSlice.reducer;
