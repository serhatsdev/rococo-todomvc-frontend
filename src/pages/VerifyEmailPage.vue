<template>
  <q-page class="flex flex-center">
    <q-card class="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 q-pa-xs q-pa-md-sm q-mb-xl">
      <q-card-section>
        <div class="text-h6 text-center">Verify Email</div>
        <div class="text-subtitle2 text-center">
          <div v-if="loading" class="flex flex-center column">
            <q-spinner v-if="loading" class="q-mt-md" color="primary" />
            <span>Verifying...</span>
          </div>
          <div v-else class="flex flex-center">
            <q-icon
              v-if="!loading"
              :name="success ? 'check_circle' : 'error'"
              class="q-mt-md"
              color="primary"
            />
            <span
              v-if="!loading"
              :class="success ? 'text-positive' : 'text-negative'"
              class="q-mt-md q-ml-sm"
              >
              {{ message }}
            </span>
          </div>
          <RouterLink v-show="!loading && success" to="/login">
            <q-btn
              label="Go to Login"
              color="primary"
              class="full-width q-mt-md"
            />
          </RouterLink>
        </div>

      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { authService } from '@/services/auth.service'

const route = useRoute()
const loading = ref(true)
const message = ref('')
const success = ref(false)

const token = route.params.token
const uidb64 = route.params.uidb64

onMounted(async () => {
  try {
    const responseData = await authService.verifyEmail(token, uidb64);
    success.value = responseData?.success;
    message.value = responseData?.message;
  } catch (error) {
    console.error('Error verifying email:', error);
    message.value = 'An error occurred while verifying your email. Please try again.';
  } finally {
    loading.value = false;
  }
})
</script>
