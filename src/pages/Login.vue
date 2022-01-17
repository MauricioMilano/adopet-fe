<template>
  <div class="q-pa-md  ">
    <div class="row ">
      <q-card class="my-card col-md-4 offset-md-4 ">
        <q-card-section>
          <q-input v-model="name" label="Nome" :bla="true" v-on:keyup.enter="login" />
          <q-input v-model="password" type="password" label="Senha" v-on:keyup.enter="login" />
        </q-card-section>
        <q-card-section>
          <q-btn
            color="primary"
            label="Enviar"
            @click="login"
            :loading="isLoading"
          />
        </q-card-section>
        <q-card-section>
          <a href="/#/cadastro"> Ou cadastre-se </a>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      name: "",
      password: "",
      isLoading: false
    };
  },
  beforeCreate() {
    const isAuth = this.$store.getters['auth/isAuthenticated']
    if(isAuth){
      this.$router.push({ path: "feed" });
      console.log("está logado")
      console.log(isAuth)
    }
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

    async login() {
      try {
        this.isLoading = !this.isLoading;
        await this.$store.dispatch("auth/AUTH_REQUEST", {
          username: this.name,
          password: this.password
        });
        this.$router.push({ path: "feed" });
        this.isLoading = !this.isLoading;
      } catch (error) {
        this.isLoading = !this.isLoading;
      }
    }
  }
};
</script>
