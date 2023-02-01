import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "products",
    }),
    getAllProductsLimit: builder.query({
      query: (limit) => `products?limit=${limit}`,
    }),
    getSearchedProducts: builder.query({
      query: (product) => `products/search?q=${product}`,
    }),
    getSingleProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    getProductByCategory: builder.query({
      query: (category) => `products/category/${category}?limit=4`,
    }),
  }),
});

export const {
  useGetAllProductsLimitQuery,
  useGetSearchedProductsQuery,
  useGetSingleProductQuery,
  useGetAllProductsQuery,
  useGetProductByCategoryQuery,
} = productsApi;
