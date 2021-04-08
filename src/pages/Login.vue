<template>
  <div class="q-ma-md">
    <div class="q-gutter-md">
      <q-input v-model="name" label="Nome" :bla="true" />
      <q-input v-model="password" type="password" label="Senha" />
      <q-btn color="primary" label="Enviar" @click="login" :loading="isLoading"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      name: '',
      password: '',
      isLoading: false
    }
  },
  beforeCreate () {
    console.log('beforeCreate')
  },
  created () {
    console.log('created')
    console.log(this.$moment().format('MMMM Do YYYY, h:mm:ss a'))
  },
  beforeMount () {
    console.log('beforeMount')
  },
  mounted () {
    console.log('mounted')
  },
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  updated () {
    console.log('updated')
  },
  beforeDestroy () {
    console.log('beforeDestroy')
  },
  destroyed () {
    console.log('destroyed')
  },
  methods: {
    async login () {
      try {
        this.isLoading = !this.isLoading
        await this.$store.dispatch('auth/AUTH_REQUEST', { name: this.name, password: this.password })
        this.$router.push({ path: '/private' })
        this.isLoading = !this.isLoading
      } catch (error) {
        this.isLoading = !this.isLoading
      }
    }
  }
}
</script>
