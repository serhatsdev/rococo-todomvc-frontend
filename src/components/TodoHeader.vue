<script setup>
</script>
<template>
  <header class="header">
    <input
            type="text"
            class="new-todo"
            autofocus
            autocomplete="off"
            placeholder="What needs to be done?"
            @keyup.enter="
                // @ts-ignore
                $emit('add-todo', $event.target.value);
                // @ts-ignore
                $event.target.value = '';
            "
      />
  </header>
</template>

<style scoped>

</style>
