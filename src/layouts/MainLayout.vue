<template>
  <q-layout view="hHh lpr fFf">
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
        <q-btn
          v-if="isAuth"
          dense
          flat
          round
          icon="chat_bubble"
          @click="rightDrawerOpen = !rightDrawerOpen"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list bordered separator>
        <q-item>
          <q-item-section>Menu</q-item-section>
        </q-item>

        <q-item
          v-if="isAuth"
          clickable
          v-ripple
          @click="$router.push({ path: '/feed' })"
        >
          <q-item-section>
            <q-item-label>Feed</q-item-label>
            <q-item-label caption>Feed de pets</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          v-if="!isAuth"
          clickable
          v-ripple
          @click="$router.push({ path: '/cadastro' })"
        >
          <q-item-section>
            <q-item-label>Cadastro</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          v-if="!isAuth"
          clickable
          v-ripple
          @click="$router.push({ path: '/login' })"
        >
          <q-item-section>
            <q-item-label>Login</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          v-if="isAuth"
          clickable
          v-ripple
          @click="$router.push({ path: '/logout' })"
        >
          <q-item-section>
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer
      v-if="isAuth"
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      bordered
    >
      <q-list bordered separator>
        <q-slide-item @left="onLeft" @right="onRight">
          <template v-slot:left>
            <q-icon name="done" />
          </template>
          <template v-slot:right>
            <q-icon name="alarm" />
          </template>

          <q-item>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white" icon="bluetooth" />
            </q-item-section>
            <q-item-section>Icons only</q-item-section>
          </q-item>
        </q-slide-item>

        <q-slide-item @left="onLeft" @right="onRight">
          <template v-slot:left>
            Left
          </template>
          <template v-slot:right>
            Right content.. long
          </template>

          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img
                  src="https://cdn.quasar.dev/img/avatar6.jpg"
                  draggable="false"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>Text only</q-item-section>
          </q-item>
        </q-slide-item>

        <q-slide-item @left="onLeft" @right="onRight">
          <template v-slot:left>
            <div class="row items-center"><q-icon left name="done" /> Left</div>
          </template>
          <template v-slot:right>
            <div class="row items-center">
              Right content.. long <q-icon right name="alarm" />
            </div>
          </template>

          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img
                  src="https://cdn.quasar.dev/img/avatar4.jpg"
                  draggable="false"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>Text and icons</q-item-section>
          </q-item>
        </q-slide-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-card class="chat">
      <q-scroll-area style="height: 430px; max-width: 350px;">
        <div v-for="n in 100" :key="n" class="q-py-xs">
          <q-chat-message :text="['hey, how are you?']" sent />
          <q-chat-message :text="['doing fine, how r you?']" />
        </div>
      </q-scroll-area>
      <q-input
        class="input-chat"
        v-model="mensagem"
        label="Escreva sua mensagem"
      />
      <q-btn
        flat
        round
        color="dark"
        @click="sendComentario(pb)"
        :icon="'send'"
      />
    </q-card>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      mensagem: ""
    };
  },
  methods: {
    onLeft({ reset }) {
      // this.$q.notify('Left action triggered. Resetting in 1 second.')
      this.finalize(reset);
    },

    onRight({ reset }) {
      // this.$q.notify('Right action triggered. Resetting in 1 second.')
      this.finalize(reset);
    },

    finalize(reset) {
      this.timer = setTimeout(() => {
        reset();
      }, 1000);
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters["auth/isAuthenticated"];
    }
  }
};
</script>
<style scoped>
.chat {
  height: 500px;
  width: 400px;
  background: white;
  border: 1px solid black;
  display: inline-block;
  z-index: 9999;
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding-left: 20px;
}
.input-chat {
  width: 80%;
  display: inline-block;
}
</style>
