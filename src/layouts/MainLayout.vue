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
          v-if="isAuth"
          clickable
          v-ripple
          @click="$router.push({ path: '/perfil' })"
        >
          <q-item-section>
            <q-item-label>Perfil</q-item-label>
            <q-item-label caption>Perfil do usuário</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          v-if="isAuth"
          clickable
          v-ripple
          @click="$router.push({ path: '/messages' })"
        >
          <q-item-section>
            <q-item-label>Minhas mensagens</q-item-label>
            <q-item-label caption>Veja suas mensagens aqui</q-item-label>
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
    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- <q-card class="chat">
      <q-scroll-area ref="scroll" id="scroll-area" style="height: 430px; max-width: 350px;">
        <div v-for="m in mensagens" :key="m.id" class="q-py-xs">
          <q-chat-message :name="m.me ? 'Eu' : m.userName" avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[m.content]" :sent="m.me" />
        </div>
      </q-scroll-area>
      <q-input
        class="input-chat"
        v-model="mensagem"
        label="Escreva sua mensagem"
              v-on:keyup.enter="sendMessage"
      />
      <q-btn
        flat
        round
        color="dark"
              @click="sendMessage"
        :icon="'send'"
      />
    </q-card> -->
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
      mensagem: "",
      mensagens: [{
        id: 1,
        me: false,
        userName: 'Samantha',
        content: 'oiii',
        date: new Date(),
      },
      {
        id: 2,
        me: false,
        userName: 'Samantha',
        content: 'tudo bom?',
        date: new Date(),
      },{
        id: 3,
        me: true,
        userName: 'Samantha',
        content: 'oie',
        date: new Date(),
      },{
        id: 4,
        me: true,
        userName: 'Samantha',
        content: 'tudo',
        date: new Date(),
      },{
        id: 5,
        me: true,
        userName: 'Samantha',
        content: 'e',
        date: new Date(),
      },{
        id: 6,
        me: true,
        userName: 'Samantha',
        content: 'contigo',
        date: new Date(),
      },{
        id: 7,
        me: true,
        userName: 'Samantha',
        content: '?',
        date: new Date(),
      },{
        id: 8,
        me: false,
        userName: 'Samantha',
        content: 'tbm',
        date: new Date(),
      },

      ],
      username:'',
      role:[],
      picture:'',
      email:''
    };
  },
  methods: {
      mounted() {
        this.goToBottom(this.$refs.scroll, 3000)
        this.getProfile()
  },
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
    },
    sendMessage() { 
      let ultimoId = this.mensagens[this.mensagens.length - 1].id + 1;
      let novaMensagem = {
        id: ultimoId,
        me: true,
        userName: 'Samantha',
        content: this.mensagem,
        date: new Date()
      };

      this.mensagem = "";
      this.mensagens.push(novaMensagem);
      this.goToBottom(this.$refs.scroll)
    },
    async getProfile(){
       const req = await this.$axios.get("/profile");
      this.username = req.data.username
      this.role = req.data.roles
      this.email = req.data.email
      this.picture = req.data.picture
    },
    goToBottom(component, delay = 100){
      setTimeout(()=>{
        let size = component.scrollSize
        component.setScrollPosition( size+300 )
      }, delay)
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
