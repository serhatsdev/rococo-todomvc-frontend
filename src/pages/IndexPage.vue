<script setup>
import PageHeader from '@/components/PageHeader.vue'
import TodosComponent from '@/components/TodosComponent.vue'
</script>

<template>
  <PageHeader text="todos" />
  <TodosComponent />
  <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Created by the Serhat S.</p>
      <p>Part of <a href="https://github.com/ecorrouge">Ecor Rouge</a></p>
  </footer>
</template>

<style scoped>
.info p {
  line-height: 1;
  margin: 11px;
}
</style>
