<template>
<div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card col-md-10 offset-md-1" flat bordered>
      <q-card-section horizontal>

        <q-scroll-area style="height: 600px ; max-width: 300px; width:150px">
          <q-list bordered separator>
          <q-item v-for="user in users" :key="user.id" clickable v-ripple :active="chatSelectedUser==user.id"	 active-class="bg-teal-1 text-grey-8" @click="selectChat(user.id)">
            <q-item-section avatar>
            <q-avatar>
              <img v-if="!user.picture" src="https://cdn.quasar.dev/img/avatar6.jpg" draggable="false">
              <img v-if="user.picture" :src="`data:image/png;base64,${user.picture}`"> 
            </q-avatar>
          </q-item-section>
          <q-item-section >{{user.username}}

          </q-item-section>
          </q-item>
          </q-list> 
        </q-scroll-area>
        <q-separator vertical />
        <!-- <q-card-actions> -->
        <div :style="`height: 600px;min-width:600px; width:800px;`">
          <div v-if="chatSelectedUser==0" > Selecione um chat para você adotar o seu novo amigo</div>
  <q-scroll-area v-if="chatSelectedUser!=0" ref="scroll" id="scroll-area" :style="`height: 535px;min-width:600px; width:100%;`">
        <div v-for="m in chatSelected" :key="m.id" class="q-py-xs">
          <q-chat-message :name="m.me ? 'Eu' : m.username" :avatar="getAvatar(m)" :text="[m.content]" :sent="m.me" />
        </div>
      </q-scroll-area>
       <q-separator horizontal />
      <q-input v-if="chatSelectedUser!=0"
       style="display:inline-block; width:93%; margin-left:5px"
        v-model="mensagem"
        label="Escreva sua mensagem"
              v-on:keyup.enter="sendMessage"
      />
      <q-btn v-if="chatSelectedUser!=0"
        style="display:inline-block;"
        flat
        round
        color="dark"
              @click="sendMessage"
        :icon="'send'"
      />
        </div>
        <!-- </q-card-actions> -->
      </q-card-section>
    </q-card>
</div>
</template>

<script>

export default {
  name: "Messages",
  components: {
    
  },
  data() {
    return {
      users: [],
      chatSelectedUser: 0,
      chatSelected:[],
      count:0,
      mensagem:'',
      userLoggedId: this.$store.getters["auth/getUserId"],
      userLogged: this.$store.getters["auth/getUser"]
    };
  },
  mounted(){
    this.getUsers()
  },

  methods:{
    getAvatar(message){
      if(message.picture) {
        return `data:image/png;base64,${message.picture}`
      }
      return ""
      // let old = this.chatSelected.filter(message_chat=> message.userFrom.id == message_chat.id)
    // if (old) return `data:image/png;base64,${old.picture}`
},
    async getUsers(){
      this.$axios.defaults.headers.common.Authorization = `Bearer ${this.$store.getters["auth/getToken"]}`;
      const req = await this.$axios.get("/myChats")
      this.users = req.data.reduce((acc, current) => {
  const x = acc.find(item => item.username === current.username);
  if (!x) {
    return acc.concat([current]);
  } else {
    return acc;
  }
}, [])
    },
    async sendMessage(){
      // let ultimoId = this.chatSelected[this.chatSelected.length - 1].id || 0 + 1;
      let novaMensagem = {
        id: this.count,
        me: true,
        userName: this.users.find(x=> x.id===this.chatSelectedUser).username,
        content: this.mensagem,
        // date: new Date()
      };
      const resp = await this.$axios.post(`/chat/${this.chatSelectedUser}`, {content: novaMensagem.content})
      this.count++;

      this.mensagem = "";

      this.chatSelected.push(novaMensagem);
      this.goToBottom(this.$refs.scroll)
      this.selectChat(this.chatSelectedUser)
    },
    async selectChat(id){
     const resp = await this.$axios.get(`/chat/${id}`)
     this.chatSelectedUser = id;
    this.chatSelected = resp.data.map(res => {
      return {
        email: res.email,
        id: res.id,
        picture: res.userFrom.picture,
        username: res.userFrom.username,
        content: res.content,
        me: res.userFrom.id===this.userLoggedId? true:false
      }
    }).sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
  

    },

    goToBottom(component, delay = 100){
      setTimeout(()=>{
        let size = component.scrollSize
        component.setScrollPosition( size+300 )
      }, delay)
    }
  }
};
</script>
