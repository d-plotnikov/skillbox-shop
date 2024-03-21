<template>
<main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link tag="a" :to="{name: 'main'}" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link tag="a" :to="{name: 'cart'}" class="breadcrumbs__link">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ products.length }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">

            <BaseFormText v-model="formData.name"
            type="text" title="ФИО" :error="formError.name" placeholder="Введите ваше полное имя"/>
            <BaseFormText v-model="formData.address"
            type="text" title="Адрес доставки" :error="formError.address"
            placeholder="Введите ваш адрес"/>
            <BaseFormText v-model="formData.phone"
            type="tel" title="Телефон" :error="formError.phone" placeholder="Введите ваш телефон"/>
            <BaseFormText v-model="formData.email"
            type="email" title="Email" :error="formError.email" placeholder="Введи ваш Email"/>
            <BaseFormTextArea v-model="formData.comment"
            title="Коментарий" :error="formError.comment"
            placeholder="Введите коментарий к заказу"/>

          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only"
                  type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order"
            v-for="(item, key) in products"
            :key="key+item.productId">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.product.price | numFormat }}</b>
              <span>Артикул: {{ item.productId }}</span>
            </li>
          </ul>
          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>3</b> товара на сумму <b>{{totalPrice | numFormat}} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorText">
          <h4>Заявка не отправлена!</h4>
          <p>
           {{ formErrorText }}
          </p>
        </div>
      </form>
    </section>
</main>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextArea from '@/components/BaseFormTextArea.vue';
import axios from 'axios';
import numFormat from '../helpers/numFormat';

export default {
  components: { BaseFormText, BaseFormTextArea },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorText: '',
    };
  },
  filters: {
    numFormat,
  },
  computed: {
    ...mapGetters({ products: 'CartDetailProducts', totalPrice: 'CartTotalPrice' }),
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorText = '';
      axios
        .post('https://vue-study.skillbox.cc/api/orders', {
          ...this.formData,
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
        })
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorText = error.response.data.error.message;
        });
    },
  },
};
</script>
