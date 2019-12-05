<template>
  <div>
    <div class="row">
      <div class="col-shrink">
        <q-input outlined v-model="text" label="Outlined" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ""
    };
  }
};
</script>

<style>
</style>