<template>
  <!-- TODO Add validations on inputs -->
  <q-form @submit="submitForm">
    <q-input
      v-if="tab == 'register'"
      v-model="formData.name"
      outlined
      label="Name"
      class="q-mb-md"
    />
    <q-input
      v-model="formData.email"
      outlined
      type="email"
      label="Email"
      class="q-mb-md"
    />

    <q-input
      v-model="formData.password"
      outlined
      type="password"
      label="Password"
      class="q-mb-md"
    />
    <div class="row">
      <q-space />
      <q-btn color="primary" :label="tab" type="submit" />
    </div>
  </q-form>
</template>

<script>
export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      if (this.tab == "login") console.log("login");
      else console.log('register');
    },
  },
};
</script>

<style>
</style>