<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title">
    </router-link>
    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>
    <span class="catalog__price">
      {{ product.price | numFormat}} ₽
    </span>
    <span class="catalog__title" v-if="product.capacitySize != false">
      Объем памяти: <b>{{ product.capacitySize }} GB</b>
    </span>
    <ul class="colors colors--black" style="margin-top: 20px!important;">
      <li class="colors__item" v-for="(item, key) in product.colors"
      :key="key" v-show="Color == '' || Color === item.id" >
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="item.code" v-model="color" >
          <span class="colors__value" :style="'background-color:' + item.code">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import gotoPage from '../helpers/gotoPage';
import numFormat from '../helpers/numFormat';

export default {
  props: ['product', 'Color'],
  data() {
    return {
      color: '#73B6EA',
    };
  },
  filters: {
    numFormat,
  },
  methods: {
    gotoPage,
  },
};
</script>
