<template>
<BaseFormFields :title="title" :error="error">
  <input class="form__input" v-model="dataValue"
  :type="type" :placeholder="placeholder">
</BaseFormFields>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  props: ['type'],
  mixins: [formFieldMixin],
};
</script>
