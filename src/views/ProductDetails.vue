<template>
  <div class="product-details">
    <button @click="addToCart(product)">Add to Cart</button>

    <Swiper
      :modules="[EffectCube, Pagination]"
      effect="cube"
      :grab-cursor="true"
      :loop="true"
      :pagination="true"
    >
      <SwiperSlide v-for="(image, index) in product.images" :key="index">
        <img :src="image" alt="Product Image" />
      </SwiperSlide>
    </Swiper>

    <div class="product-info">
      <h2>{{ product.title }}</h2>
      <p>{{ product.description }}</p>
      <span>Price: ${{ product.price }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { sendRequest } from "../utils/apiUtils";
import { PRODUCT_API } from "../constants/apiURL";

import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCube, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

const route = useRoute();

const id = route.params.id;

const product = ref({});

const fetchProduct = async () => {
  const data = await sendRequest(`${PRODUCT_API}${id}`);
  product.value = data;
};

import { useStore } from "vuex";

const store = useStore();

const addToCart = (product) => {
  store.dispatch("addToCart", product);
};

fetchProduct();
</script>

<style scoped>
.product-details {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.product-details h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.product-info {
  margin-top: 20px;
}

.product-info h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.product-info p {
  margin-bottom: 15px;
}

.product-info span {
  font-weight: bold;
  font-size: 18px;
}
.product-details button {
  position: absolute;
  top: 20px;
  right: 10px;
  padding: 10px 20px;
  margin-left: 60px;
}
.product-details img {
  width: 100%;
  height: 100%;
}
.swiper {
  width: 500px;
  height: 400px;
  overflow: visible;
}
@media (max-width: 600px) {
  .product-details {
    padding-top: 50px;
  }
  .swiper {
    width: 100%;
    height: 300px;
  }
}
</style>
