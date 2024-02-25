<template>
  <div class="filter">
    <form @submit.prevent="onSubmit">
      <select v-model="filterBy">
        <option value="" selected>All</option>
        <option v-for="category in categories" :value="category">
          {{ category }}
        </option>
        <option value="price-high">Price high to low</option>
        <option value="rating">Rating</option>
      </select>
      <input
        type="text"
        v-model="search"
        class="search"
        placeholder="search a product"
      />
      <button type="submit">Search</button>
    </form>
    <p>Total products: {{ total || 0 }}</p>
  </div>
</template>

<script setup>
import { CATEGORIES_API } from "@/constants/apiURL";
import { sendRequest } from "@/utils/apiUtils";
import { defineProps, ref } from "vue";

const categories = ref([]);

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
});

const fetchCategories = async () => {
  const data = await sendRequest(CATEGORIES_API);
  categories.value = data;
};

const emit = defineEmits(["filteredSubmit"]);

const search = ref("");
const filterBy = ref("");

const onSubmit = () => {
  const filterQuery = {
    search: search.value,
    filterBy: filterBy.value,
  };
  emit("filteredSubmit", filterQuery);
};

fetchCategories();
</script>
