<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120"
      :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }} 
    </h3>
    <p class="product__info" v-if="item.product.capacitySize > 0">
      Объем: <span>{{ item.product.capacitySize }} GB</span>
    </p>
    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар">
        <svg width="10" height="10" fill="currentColor" @click="minusOneProduct()">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model.number="amount" name="count">

      <button type="button" aria-label="Добавить один товар" @click="amount++">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ (item.product.price * item.amount) | numFormat }} ₽
    </b>

    <button class="product__del button-del" type="button"
    aria-label="Удалить товар из корзины" @click.prevent="deleteToCart(item.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapActions } from 'vuex';
import numFormat from '../helpers/numFormat';

export default {
  props: ['item'],
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  },
  filters: {
    numFormat,
  },
  methods: {
    ...mapActions(['deleteCartProduct']),
    deleteToCart(item) {
      this.deleteCartProduct(item);
    },
    minusOneProduct() {
      if (this.amount > 0) {
        // eslint-disable-next-line no-plusplus
        this.amount--;
      }
    },
  },
};
</script>
