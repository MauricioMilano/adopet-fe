<template>
  <div class="q-pa-md  ">
    <div class="row ">
      <q-card class="my-card col-md-4 offset-md-4 ">
        <q-card-section>
          <q-input v-model="name" label="Nome" :bla="true" />
          <q-input v-model="email" label="Email" />
          <q-input v-model="password" type="password" label="Senha" />
        </q-card-section>
        <q-card-section>
          <q-btn
            color="primary"
            label="Enviar"
            @click="signup"
            :loading="isLoading"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cadastro",
  data() {
    return {
      name: "",
      password: "",
      email: "",
      isLoading: false
    };
  },
  beforeCreate() {
    // console.log('beforeCreate')
  },
  created() {
    // console.log('created')
    // console.log(this.$moment().format('MMMM Do YYYY, h:mm:ss a'))
  },
  beforeMount() {
    // console.log('beforeMount')
  },
  mounted() {
    // console.log('mounted')
  },
  beforeUpdate() {
    // console.log('beforeUpdate')
  },
  updated() {
    // console.log('updated')
  },
  beforeDestroy() {
    // console.log('beforeDestroy')
  },
  destroyed() {
    // console.log('destroyed')
  },
  methods: {
    async signup() {
      this.isLoading = !this.isLoading;
      await this.$axios.post("/api/auth/signup", {
        username: this.name,
        email: this.email,
        password: this.password,
        role: ["user"]
      });
      this.login();
      this.isLoading = !this.isLoading;
    },
    async login() {
      try {
        this.isLoading = !this.isLoading;

        await this.$store.dispatch("auth/AUTH_REQUEST", {
          username: this.name,
          password: this.password
        });
        this.$router.push({ path: "/feed" });
        this.isLoading = !this.isLoading;
      } catch (error) {
        this.isLoading = !this.isLoading;
      }
    }
  }
};
</script>
