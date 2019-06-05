<template>
  <div class="message" v-if="message">
    <p>{{message}}</p>
  </div>
</template> 

<script>
export default {
  props: {
    message: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
    .message{
        text-align: center;
        padding: 20px;
    }
</style>