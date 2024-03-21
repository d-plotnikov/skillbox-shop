<template>
<aside class="filter">
  <h2 class="filter__title">Фильтры</h2>

  <form @submit.prevent="submit" class="filter__form form"
  action="#"
  method="get">
    <fieldset class="form__block">
      <legend class="form__legend">Цена</legend>
      <label class="form__label form__label--price">
        <input class="form__input" type="text" name="min-price" value="0"
        v-model.number="currentPriceFrom">
        <span class="form__value">От</span>
      </label>
      <label class="form__label form__label--price">
        <input class="form__input" type="text" name="max-price"
        value="12345" v-model.number="currentPriceTo">
        <span class="form__value">До</span>
      </label>
    </fieldset>

    <fieldset class="form__block">
      <legend class="form__legend">Категория</legend>
      <label class="form__label form__label--select">
        <select class="form__select" type="text" name="category" v-model.number="currentCategoryId">
          <option value="0">Все категории</option>
          <option :value="category.id"
          v-for="category in categories"
          :key="category.id">
          {{ category.title }}</option>
        </select>
      </label>
    </fieldset>

    <fieldset class="form__block">
      <legend class="form__legend">Цвет</legend>
      <ul class="colors">
        <li class="colors__item" v-for="(col, index) in colors" :key="index">
          <label class="colors__label">
            <input class="colors__radio sr-only" v-model="currentColor"
            type="radio" name="color" :value="col.id">
            <span class="colors__value" :style="'background-color:' + col.code">
            </span>
          </label>
        </li>
      </ul>
    </fieldset>

    <fieldset class="form__block">
      <legend class="form__legend">Объем в ГБ</legend>
      <ul class="check-list">
        <li class="check-list__item" v-for="(capacity) in capacitys"
        :key="capacity.size + 'checkbox'">
          <label class="check-list__label" :for="capacity.size + 'checkbox'">
            <input :id="capacity.size + 'checkbox'" class="check-list__check sr-only"
            v-model="currentCheck"
            type="checkbox" name="volume"
            :value="capacity.size">
            <span class="check-list__desc">
              {{ capacity.size }}
              <span></span>
            </span>
          </label>
        </li>
      </ul>
    </fieldset>
    <button class="filter__submit button button--primery" type="submit">
      Применить
    </button>
    <button class="filter__reset button button--second" type="button" @click.prevent="reset">
      Сбросить
    </button>
  </form>
  </aside>
</template>

<script>
import axios from 'axios';
import capacitys from '../data/capacitys';

export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColor: '',
      currentCheck: [],
      currentPage: 1,
      categoriesData: null,
      colorsData: null,
    };
  },
  props: ['page', 'PriceFrom', 'PriceTo', 'CategoryId', 'Color', 'Check'],
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    capacitys() {
      return capacitys;
    },
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
  },
  watch: {
    PriceFrom(value) {
      this.currentPriceFrom = value;
    },
    PriceTo(value) {
      this.currentPriceTo = value;
    },
    CategoryId(value) {
      this.currentCategoryId = value;
    },
    Check(value) {
      this.currentCheck = value;
    },
    Color(value) {
      this.currentColor = value;
    },
    page(value) {
      this.currentPage = value;
    },
  },
  methods: {
    submit() {
      this.$emit('update:price-from', this.currentPriceFrom);
      this.$emit('update:price-to', this.currentPriceTo);
      this.$emit('update:category-id', this.currentCategoryId);
      this.$emit('update:check', this.currentCheck);
      this.$emit('update:color', this.currentColor);
      this.$emit('update:page', this.currentPage = 1);
    },
    reset() {
      this.$emit('update:price-from', 0);
      this.$emit('update:price-to', 0);
      this.$emit('update:category-id', 0);
      this.$emit('update:check', []);
      this.$emit('update:color', '');
      this.$emit('update:page', this.currentPage = 1);
    },
    loadCategories() {
      axios.get('https://vue-study.skillbox.cc/api/productCategories')
        .then(response => this.categoriesData = response.data);
    },
    loadColors() {
      axios.get('https://vue-study.skillbox.cc/api/colors')
        .then(response => this.colorsData = response.data);
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
  },
};
</script>
