<template>
  <div class="product-list-container" v-if="products?.length">
    <ul class="product-list">
      <li v-for="product in paginatedProducts" class="product-item">
        <RouterLink :to="`/product/${product.id}`">
          <img :src="product.thumbnail" :alt="product.title" />
          <p>{{ product.title }}</p>
          <span>Price: ${{ product.price }}</span>
          <button>Add to cart</button></RouterLink
        >
      </li>
    </ul>
    <div class="pagination">
      <button @click="prev">Prev</button>
      <span>{{ currentPage }} / {{ totalPage }}</span>
      <button @click="next">Next</button>
    </div>
  </div>
  <div v-else class="loading">
    <h1>Loading...</h1>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from "vue";

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});

const currentPage = ref(1);
const perPage = 30;
const offset = computed(() => (currentPage.value - 1) * perPage);
const paginatedProducts = computed(() => {
  return props.products.slice(offset.value, offset.value + perPage);
});

const totalPage = computed(() => Math.ceil(props.products.length / perPage));

const next = () => {
  if (currentPage.value * perPage < props.products.length) {
    currentPage.value++;
  }
};
const prev = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>
