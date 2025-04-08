<script setup>
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

const props = defineProps(['todos']);
const route = useRoute();
const remaining = computed(() => props.todos.filter(todo => !todo.completed).length);
const filter = computed(() => route.query.filter || 'all');

const showClearCompleted = computed(() => {
    return props.todos.some(todo => todo.is_completed);
});

</script>

<template>
    <footer class="footer" v-show="todos.length > 0">
        <span class="todo-count">
            <strong>{{ remaining }}</strong> {{ remaining === 1 ? "item" : "items" }} left
        </span>
        <ul class="filters">
            <li><RouterLink to="/dashboard" :class="{ selected: filter == 'all' }">All</RouterLink></li>
            <li><RouterLink to="/dashboard?filter=active" :class="{ selected: filter == 'active' }">Active</RouterLink></li>
            <li><RouterLink to="/dashboard?filter=completed" :class="{ selected: filter == 'completed' }">Completed</RouterLink></li>
        </ul>
        <button class="clear-completed" v-show="showClearCompleted" @click="$emit('delete-completed')">Clear Completed</button>
    </footer>
</template>
