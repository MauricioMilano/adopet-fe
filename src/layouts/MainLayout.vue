<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Adopet
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
    <q-list bordered separator>
      <q-item >
        <q-item-section>Menu</q-item-section>
      </q-item>

      <q-item v-if="isAuth" clickable v-ripple @click="$router.push({path:'/feed'})">
        <q-item-section>
          <q-item-label>Feed</q-item-label>
          <q-item-label caption>Feed de pets</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="!isAuth" clickable v-ripple @click="$router.push({path:'/cadastro'})">
        <q-item-section>
          <q-item-label>Cadastro</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="!isAuth" clickable v-ripple @click="$router.push({path:'/login'})">
        <q-item-section>
          <q-item-label>Login</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="isAuth" clickable v-ripple @click="$router.push({path:'/logout'})">
        <q-item-section>
          <q-item-label>Logout</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  components: {  },
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    isAuth () {
      return this.$store.getters['auth/isAuthenticated']
    }
  }
}
</script>
