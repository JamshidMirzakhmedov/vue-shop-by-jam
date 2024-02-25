<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <h2>Shopping Cart</h2>
      <ul>
        <li v-for="(item, index) in cart" :key="index">
          <img :src="item.thumbnail" alt="" />
          {{ item.title }} - ${{ item.price }}
          <button @click="removeFromCart(index)">Remove</button>
        </li>
      </ul>
      <p>Total: {{ calculateTotal }}</p>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

const store = useStore();

const cart = computed(() => store.getters.cart);

const removeFromCart = (index) => {
  store.dispatch("removeFromCart", index);
};

const calculateTotal = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.price, 0);
});
</script>

<style scoped>
.backdrop {
  z-index: 1000;
  top: 0;
  left: 0;
  position: fixed;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
.modal {
  width: 600px;
  padding: 20px;
  margin: 100px auto;
  background: white;
  border-radius: 10px;
  height: auto;
}
li {
  margin: 50px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
li img {
  width: 90px;
}
@media (max-width: 600px) {
  .modal {
    width: 90%;
    padding: 10px;
  }
  li {
    margin: 10px 0;
    justify-content: space-between;
  }
}
</style>
