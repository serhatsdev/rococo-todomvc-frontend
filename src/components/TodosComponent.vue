<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import TodoFooter from './TodoFooter.vue';
import TodoHeader from './TodoHeader.vue';
import TodoItem from './TodoItem.vue';
import { todosService } from '@/services/todos.service';

const todos = ref([]);
const route = useRoute();
const filter = computed(() => route.query.filter || 'all');

const filters = {
    all: (todos) => todos,
    active: (todos) => todos.value.filter((todo) => !todo.is_completed),
    completed: (todos) => todos.value.filter((todo) => todo.is_completed),
};

const activeTodos = computed(() => filters.active(todos));
const completedTodos = computed(() => filters.completed(todos));
const filteredTodos = computed(() => {
    switch(filter.value) {
        case "active":
            return activeTodos;
        case "completed":
            return completedTodos;
        default:
            return todos;
    }
});

onMounted(async () => {
  await refreshTodos();
});

const toggleAllModel = computed({
    get() {
        return activeTodos.value.length === 0;
    },
    async set(value) {
        todos.value.forEach((todo) => {
            todo.completed = value;
        });

        value ? await todosService.completeAllTodos()
              : await todosService.activateAllTodos();
        await refreshTodos();
    },
});

async function refreshTodos() {
    todos.value = await todosService.getTodos();
}

async function addTodo(value) {
    todos.value.push({ title: value, is_completed: false });

    await todosService.createTodo({ title: value });
    await refreshTodos();
}

async function deleteTodo(todo) {
    todos.value = todos.value.filter((t) => t !== todo);

    await todosService.deleteTodoById(todo.entity_id);
    await refreshTodos();
}

async function toggleTodo(todo) {
    todo.is_completed = !todo.is_completed;
    await todosService.toggleTodoById(todo.entity_id);
    await refreshTodos();
};

async function editTodo(todo, value) {
    todo.title = value;

    await todosService.updateTodoById(todo.entity_id, { title: value });
    await refreshTodos();
}

async function clearCompleted() {
    todos.value = todos.value.filter((todo) => !todo.is_completed);

    await todosService.clearCompletedTodos();
    await refreshTodos();
}
</script>

<template>

  <section class="todoapp">
    <TodoHeader @add-todo="addTodo" />
    <main class="main" v-show="todos.length > 0">
        <div class="toggle-all-container">
            <input type="checkbox" id="toggle-all-input" class="toggle-all" v-model="toggleAllModel" :disabled="todos.length === 0"/>
            <label class="toggle-all-label" htmlFor="toggle-all-input"> Toggle All Input </label>
        </div>
        <ul class="todo-list">
            <TodoItem v-for="(todo, index) in filteredTodos.value" :key="todo.id" :todo="todo" :index="index"
                @delete-todo="deleteTodo" @edit-todo="editTodo" @toggle-todo="toggleTodo" />
        </ul>
    </main>
    <TodoFooter :todos="todos" @delete-completed="clearCompleted" />
  </section>
</template>

<style scoped>
.todoapp {
    min-width: 230px;
    max-width: 550px;
    margin: 0 auto;
    position: relative;
}
</style>
