<template>
<BaseFormFields :title="title" :error="error">
  <textarea class="form__input form__input--area"
  v-model="dataValue" name="comments" :placeholder="placeholder" :type="type"></textarea>
</BaseFormFields>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  props: ['type'],
  mixins: [formFieldMixin],
};
</script>
