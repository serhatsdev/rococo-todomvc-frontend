<template>
  <q-page class="flex row flex-center">
    <q-dialog v-model="successDialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Signup successful</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Account created successfully. Check your email for a verification link and follow the link
          to set a password for your account.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Back to login" color="primary" @click="backToLogin" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-card class="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 q-pa-xs q-pa-md-sm q-mb-xl">
      <q-card-section>
        <div class="text-h6 text-center">Create an account</div>
      </q-card-section>

      <q-card-section>
        <q-form
          @submit.prevent="onSubmit"
          @validation="isValid = $event"
          class="full-width"
          ref="formRef">
          <!-- First name -->
          <q-input
            v-model="firstName"
            type="text" label="First name"
            outlined class="q-mb-lg"
            :rules="firstNameRules" />

          <!-- Last name -->
          <q-input
            v-model="lastName"
            type="text"
            label="Last name"
            outlined class="q-mb-lg"
            :rules="lastNameRules" />

          <!-- E-mail address -->
          <q-input
            v-model="emailAddress"
            type="email"
            label="E-mail address"
            outlined
            class="q-mb-lg"
            :rules="emailRules"
          />

          <!-- Password -->
          <q-input
            v-model="password"
            type="password"
            label="Password"
            aria-autocomplete="current-password"
            outlined
            class="q-mb-lg"
            :rules="passwordRules"
          />
          <!-- Confirm Password -->
          <q-input
            v-model="confirmPassword"
            type="password"
            label="Confirm Password"
            aria-autocomplete="current-password"
            outlined
            class="q-mb-lg"
            :rules="confirmPasswordRules"
          />

          <!-- Signup Button -->
          <q-btn
            label="Create account"
            color="primary"
            type="submit"
            class="full-width"
            :loading="signupLoading"
          />

          <!-- Signup Link -->
          <div class="text-center q-mt-md">
            <span>Already have an account? </span>
            <router-link to="/login">Log in</router-link>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/auth.service'

const formRef = ref(null)

const firstName = ref('')
const lastName = ref('')
const emailAddress = ref('')
const password = ref('')
const confirmPassword = ref('')

const successDialog = ref(false)
const signupLoading = ref(false)

const router = useRouter()

async function onSubmit() {
  const isValid = await formRef.value.validate()
  if (!isValid) {
    return
  }

  signupLoading.value = true

  let success = await authService.signup({
    first_name: firstName.value,
    last_name: lastName.value,
    email_address: emailAddress.value,
    password: password.value,
    confirm_password: confirmPassword.value,
  })

  signupLoading.value = false

  if (success) {
    successDialog.value = true
  }
}

const firstNameRules = [(v) => !!v || 'First name is required']
const lastNameRules = [(v) => !!v || 'Last name is required']
const emailRules = [
  (v) => !!v || 'E-mail address is required',
  (v) => /.+@.+\..+/.test(v) || 'E-mail address must be valid',
]
const passwordRules = [
  (v) => !!v || 'Password is required',
  (v) => v.length >= 8 || 'Min 8 characters',
]
const confirmPasswordRules = [(v) => v === password.value || 'Passwords do not match.']

function backToLogin() {
  router.push('/login')
}
</script>
