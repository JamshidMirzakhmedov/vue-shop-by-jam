<script setup>
import { RouterView } from "vue-router";
import Cart from "./components/Cart.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

const showCart = ref(false);

const cart = computed(() => store.getters.cart || []);
const addedProducts = computed(() => cart.value.length || 0);

const toggleCart = () => {
  showCart.value = !showCart.value;
};
</script>

<template>
  <header>
    <Cart v-if="showCart" @close="toggleCart" />
    <div class="logo">
      <RouterLink to="/">
        <img src="./assets/logo.png" alt="logo" />
      </RouterLink>
    </div>
    <nav>
      <ul>
        <li>New Products</li>
        <li>Category</li>
        <li>Sales</li>
        <li>Contact</li>
        <li>About us</li>
      </ul>
    </nav>
    <div class="cart" @click="toggleCart">
      <img src="./assets/cart.jpeg" alt="cart" />
      <span :class="addedProducts == 0 ? 'hidden' : 'addedProducts'">{{
        addedProducts
      }}</span>
    </div>
  </header>

  <RouterView />
</template>
