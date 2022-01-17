<template>
  <div class="q-pa-md  ">
    
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
    };
  },
  beforeCreate() {
      this.$store.dispatch('auth/AUTH_LOGOUT')
      this.$router.push({path:'/login'})
  }
};
</script>
