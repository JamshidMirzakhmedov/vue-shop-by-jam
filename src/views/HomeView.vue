<script setup>
import ProductList from "@/components/ProductList.vue";
import Filter from "@/components/Filter.vue";
import handleFilter from "../utils/handleFilter";
import { sendRequest } from "../utils/apiUtils";
import { ref } from "vue";
import { PRODUCTS_API } from "../constants/apiURL";
const productsData = ref({ value: [] });

const fetchProducts = async () => {
  const data = await sendRequest(PRODUCTS_API);
  productsData.value = data;
};

const applyFilter = (filterQuery) => {
  handleFilter(filterQuery, productsData);
};

fetchProducts();
</script>

<template>
  <main>
    <Filter :total="+productsData.total" @filtered-submit="applyFilter" />
    <ProductList :products="productsData.products || []" />
  </main>
</template>
