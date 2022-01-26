<template>
  <div class="q-pa-md row items-start q-gutter-md">

      <q-card
        v-for="pb in publications"
        :key="pb.id"
        class="my-card col-md-4 offset-md-1 "
        flat
        bordered
      >
        <q-carousel
          v-model="pb.slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          control-color="primary"
          infinite
          navigation
          padding
          arrows
          height="500px"
          class="bg-grey-1 shadow-2 rounded-borders"
        >
          <q-carousel-slide
            v-for="pet in pb.pets"
            :key="pet.id"
            :name="pb.pets.indexOf(pet)"
            class="column no-wrap"
          >
            <!-- <div class="row fit justify-start items-center  no-wrap"> -->
            <q-img
              height="300px"
              v-if="pet.pics"
              :src="`data:image/png;base64,${pet.pics}`"
            />
            <div class="text-h5 q-mt-sm q-mb-xs">{{ pet.name }}</div>
            <div class="text-caption text-grey">
              {{ pet.age }}
            </div>
            <!-- </div> -->
          </q-carousel-slide>
        </q-carousel>
        <q-separator />
        <q-card-section>
          <div v-if="canEdit(pb)">
            <q-btn-dropdown color="primary" push no-caps label="Opções">
              <q-list>
                <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <q-avatar icon="edit" color="warning" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Editar</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="excluir(pb)">
                  <q-item-section avatar>
                    <q-avatar
                      icon="delete"
                      color="negative"
                      text-color="white"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Excluir</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <div class="text-overline text-orange-9">{{ pb.zipcode }}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ pb.address }}</div>
          <div class="text-caption text-grey">
            {{ pb.description }}
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-badge
            outline
            color="primary"
            :label="
              `${pb.qtdLikes} ${pb.qtdLikes > 1 ? 'curtidas' : 'curtida'}`
            "
          />
          <q-badge
            outline
            color="dark"
            :label="
              `${pb.comments.length} ${
                pb.comments.length > 1 ? 'comentários' : 'comentário'
              }`
            "
          />
        </q-card-section>
        <q-separator />
        <q-card-actions v-if="!canEdit(pb)">
          <q-btn
            flat
            color="primary"
            label="Enviar mensagem para o dono"
            icon="chat_bubble"
          />
        </q-card-actions>
        <q-separator />
        <q-card-actions>
          <q-btn
            flat
            round
            color="primary"
            :icon="pb.liked ? 'favorite' : 'favorite_border'"
            @click="like(pb)"
          />
          <q-separator vertical />
          <q-btn
            flat
            color="primary"
            label="Comentarios"
            @click="pb.expanded = !pb.expanded"
          />

          <q-space />
        </q-card-actions>

        <q-slide-transition>
          <div v-show="pb.expanded">
            <div v-for="comment in pb.comments" :key="comment.id">
              <q-separator />
              <q-card-section class="text-subitle2">
                <b>{{ comment.user.username }}: </b>
                {{ comment.content }}
              </q-card-section>
            </div>
            <q-separator />
            <q-input
              type="text"
              v-model="pb.comentario"
              label="Digite um comentário"
              class="input-comment"
              v-on:keyup.enter="sendComentario(pb)"
            >
            </q-input>
            <q-btn
              flat
              round
              color="dark"
              @click="sendComentario(pb)"
              :icon="'send'"
            />
          </div>
        </q-slide-transition>
      </q-card>
    <q-btn
      flat
      round
      color="dark"
      class="plus-btn"
      @click="$router.push({ path: '/post' })"
      :icon="'add_circle'"
    />
  </div>
</template>
<script>
export default {
  name: "Feed",
  data() {
    return {
      name: "",
      password: "",
      lorem: "aaaaaaaaaaaa",
      userLoggedId: this.$store.getters["auth/getUserId"],
      userLogged: this.$store.getters["auth/getUser"],
      publications: [
        {
          id: 1,
          liked: false,
          slide: 0,
          expanded: false,
          qtdLikes: 1,
          pets: [{ name: "", age: "" }],
          comments: [{ id: "", user: { username: "" }, content: "" }],
          user: { id: "", name: "" }
        }
      ],
      expanded: true,
      isLoading: false,
      slide: 1,
      fullscreen: false
    };
  },
  beforeCreate() {
    // console.log('beforeCreate')
  },
  async created() {
    await this.boot();

    // console.log('created')
    // console.log(this.$moment().format('MMMM Do YYYY, h:mm:ss a'))
  },
  beforeMount() {
    // console.log('beforeMount')
  },
  mounted() {
    // this.publications.forEach(this.publications =)
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
    async like(publication) {
      const req = await this.$axios.post(`like/${publication.id}`, {});
      publication.liked = req.data.youLiked ? req.data.youLiked : false;
      publication.qtdLikes = req.data.qtdLikes;
      console.log(req.data);
    },

    async boot() {
      this.$axios.defaults.headers.common.Authorization = `Bearer ${this.$store.getters["auth/getToken"]}`;
      const req = await this.$axios.get("/publications");
      this.publications = [];
      req.data.forEach(async elem => {
        elem.expanded = false;
        elem.slide = 0;
        const like = await this.$axios.get(`/like/${elem.id}`);
        elem.liked = like.data.youLiked ? like.data.youLiked : false;
        elem.qtdLikes = like.data.qtdLikes;
        this.publications.push(elem);
        return elem;
      });
    },
    async sendComentario(pb) {
      const req = await this.$axios.post(
        `/comment/${pb.id}`,
        { message: pb.comentario },
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/getToken"]}`
          }
        }
      );
      let comment = {
        id: "",
        user: { username: this.userLogged },
        content: pb.comentario
      };
      pb.comments.push(comment);
      pb.comentario = "";
    },
    canEdit(pb) {
      return pb.user.id === this.userLoggedId;
    },
    async excluir(pb) {
      await this.$axios.delete(`/publications/${pb.id}`);
      this.boot();
    }
  }
};
</script>
<style scoped>
.input-comment {
  width: 70%;
  display: inline-block;
  margin: 0px 10px 10px 10px;
}

.plus-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  font: 4em sans-serif;
}
</style>
