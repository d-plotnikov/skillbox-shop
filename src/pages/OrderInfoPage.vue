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
        Заказ оформлен <span>№ {{ orderData.id }}</span>
    </h1>
    </div>

    <section class="cart">
    <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
        <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина.
            На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
        </p>

        <ul class="dictionary">
            <li class="dictionary__item">
            <span class="dictionary__key">
                Получатель
            </span>
            <span class="dictionary__value">
                {{ orderData.name }}
            </span>
            </li>
            <li class="dictionary__item">
            <span class="dictionary__key">
                Адрес доставки
            </span>
            <span class="dictionary__value">
                {{ orderData.address }}
            </span>
            </li>
            <li class="dictionary__item">
            <span class="dictionary__key">
                Телефон
            </span>
            <span class="dictionary__value">
                {{ orderData.phone }}
            </span>
            </li>
            <li class="dictionary__item">
            <span class="dictionary__key">
                Email
            </span>
            <span class="dictionary__value">
                {{ orderData.email }}
            </span>
            </li>
            <li class="dictionary__item">
            <span class="dictionary__key">
                Способ оплаты
            </span>
            <span class="dictionary__value">
                картой при получении
            </span>
            </li>
        </ul>
        </div>

        <div class="cart__block">
        <ul class="cart__orders">
            <li class="cart__order" v-for="(item, key) in orderData.basket.items" :key="key">
            <h3>{{item.product.title}}</h3>
            <b>{{item.product.price | numFormat}} ₽</b>
            <span>Артикул: {{item.product.id}}</span>
            </li>
        </ul>

        <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{orderData.basket.items.length}}</b>
            товара на сумму <b>{{orderData.totalPrice | numFormat}} ₽</b></p>
        </div>
        </div>
    </form>
    </section>
</main>
</template>

<script>
import numFormat from '../helpers/numFormat';

export default {
  created() {
    if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
      return;
    }
    this.$store.dispatch('loadOrderInfo', this.$route.params.id);
  },
  filters: {
    numFormat,
  },
  computed: {
    orderData() {
      return this.$store.state.orderInfo;
    },
  },
};
</script>
