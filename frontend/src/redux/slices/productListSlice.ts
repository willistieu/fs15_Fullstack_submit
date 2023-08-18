import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductList } from "../../utils/productController";
import { IItem } from "../../components/ProductItem";
import { RootState } from "../store";

interface IproductSlice {
  products: IItem[];
}
const initialState: IproductSlice = {
  products: [],
};

export const fetProductListThunk = createAsyncThunk(
  "loadingProducts",
  async (props: {offset: number, limit: number}) => {
    const products: IItem[] = (await fetchProductList(props.offset, props.limit)) as IItem[];
    // let startLoop = props.offset
    // let endLoop = products.length < props.offset + props.limit ? products.length : props.offset + props.limit 
    // let result: IItem[] = []
    // for (let index = startLoop; index < endLoop; index++) {
    //   result = [...result, products[index]]
    // }
    // return result
    return products
  }
);

export const productListSlice = createSlice({
  name: "ProductList",
  initialState,
  reducers: {
    loadingProducts: (state, action: PayloadAction<IItem[]>) => {
      state.products = action.payload;
    },

  },
  extraReducers(builder) {
    builder.addCase(
      fetProductListThunk.fulfilled,
      (state, action: PayloadAction<IItem[]>) => {
        state.products = action.payload;
      }
    )
  
  },
});
export const { loadingProducts } = productListSlice.actions;
export const getProductList = (state: RootState) => state.productListReducer;

export default productListSlice.reducer;

export const getallProdut = (state: RootState) =>
  state.productListReducer.products;
