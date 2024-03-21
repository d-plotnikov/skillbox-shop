<template>
  <div>
    <main class="content container">
      <div class="content__top content__top--catalog">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info" v-if="countProducts > 1 && countProducts < 5">
          {{countProducts}} товара
        </span>
        <span class="content__info" v-if="countProducts > 5 || countProducts === 0">
          {{countProducts}} товаров
        </span>
      </div>

      <div class="content__catalog">
        <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :check.sync="filterCheck"
        :color.sync="filterColor"
        :page.sync="page"
        />
        <section class="catalog" style="align-items: center">
          <ProductList :products="products" :color.sync="filterColor"/>
          <h1 class="content__title" style="text-align: center" v-if="productsLoading">
              Идет загрузка товаров...
          </h1>
          <h1 class="content__title" style="text-align: center" v-if="productsLoadingError">
              Произошла ошибка, попробуйте еще раз, нажмите на кнопку.
              <button class="button button--second" @click="loadProducts">Попробовать</button>
          </h1>
          <h1 class="content__title" style="text-align: center"
          v-if="countProducts === 0  && !productsLoading && !productsLoadingError">
              Разраб сказал: "Таких товаров нет!"
          </h1>
          <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>

      </section>

      </div>
    </main>

  </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: '',
      filterCheck: [],
      page: 1,
      productsPerPage: 6,
      productsData: null,

      productsLoading: false,
      productsLoadingError: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        }))
        : [];
    },
    countProducts() {
      return this.productsData
        ? this.productsData.pagination.total : 0;
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    },
  },
  methods: {
    loadProducts() {
      clearTimeout(this.loadProductsTimer);
      this.productsLoading = true;
      this.productsLoadingError = false;
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get('https://vue-study.skillbox.cc/api/products', {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              colorId: this.filterColor,
            },
          })
          // eslint-disable-next-line no-return-assign
          .then((response) => this.productsData = response.data)
          // eslint-disable-next-line no-return-assign
          .catch(() => this.productsLoadingError = true)
          // eslint-disable-next-line no-return-assign
          .then(() => this.productsLoading = false);
      }, 0);
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
