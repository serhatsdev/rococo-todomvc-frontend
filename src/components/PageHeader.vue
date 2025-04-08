<script setup>
defineProps({
  text: String,
});
</script>

<template>
  <h1>{{ text }}</h1>
</template>

<style scoped>
h1 {
  margin: 20px 0;
  font-size: 80px;
  font-weight: 200;
  text-align: center;
  color: #b83f45;
}
</style>
