<template>
  <q-page class="flex flex-center column q-pa-md">
    <div class="text-h4 q-mb-lg">Settings</div>

    <q-card class="settings-card" style="min-width: 400px">
      <q-card-section>
        <div class="text-h6 q-mb-md">Profile Information</div>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            v-model="profileFirstName"
            label="First Name"
            :rules="[val => !!val || 'First name is required']"
          />

          <q-input
            v-model="profileLastName"
            label="Last Name"
            :rules="[val => !!val || 'Last name is required']"
          />

          <div class="row justify-end q-mt-md">
            <q-btn
              color="primary"
              label="Save Changes"
              type="submit"
              :loading="loading"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const loading = ref(false)
const profileFirstName = ref('')
const profileLastName = ref('')

onMounted(() => {
  profileFirstName.value = authStore.user?.first_name || ''
  profileLastName.value = authStore.user?.last_name || ''
})

const onSubmit = async () => {
  loading.value = true
  await authService.updateUserProfile({
    first_name: profileFirstName.value,
    last_name: profileLastName.value
  })
  loading.value = false
}
</script>

<style scoped>
.settings-card {
  width: 100%;
  max-width: 600px;
}
</style>
