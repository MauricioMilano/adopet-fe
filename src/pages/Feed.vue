<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card
      v-for="pb in publications"
      :key="pb.id"
      class="my-card col-md-3 "
      flat
      bordered
    >
      <q-img
        height="300px"
        v-if="pb.pets[0].pics"
        :src="`data:image/png;base64,${pb.pets[0].pics}`"
      />

      <q-card-section>
        <div class="text-overline text-orange-9">{{ pb.address }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ pb.address }}</div>
        <div class="text-caption text-grey">
          {{ pb.description }}
        </div>
      </q-card-section>

      <q-card-actions>
        <q-badge outline color="primary" :label="`${pb.qtdLikes} curtidas`" />
        <q-btn
          flat
          round
          color="dark"
          :icon="pb.liked ? 'favorite' : 'favorite_border'"
          @click="like(pb)"
        />
        <q-btn
          flat
          color="primary"
          label="Comments"
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
      @click="goToPost"
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
      publications: [
        {
          id:1,
          liked: false,
          expanded:false,
          qtdLikes:1,
          pets: [{ name: "", age: "" }],
          comments: [{ id: "", user: { username: "mario" }, content:"something  " }],
          user: { name: "" }
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
    goToPost() {
      this.$router.push({ path: "/post" });
    },
    async like(publication) {
      const req = await this.$axios.post(`like/${publication.id}`, {});
      publication.liked = req.data.youLiked ? req.data.youLiked : false;
      publication.qtdLikes = req.data.qtdLikes;
      console.log(req.data);
    },

    async boot() {
      this.$axios.defaults.headers.common.Authorization = `Bearer ${this.$store.getters["auth/getToken"]}`;
      const req = await this.$axios.get("/publications");
      this.publications = []
      req.data.forEach(async elem => {
        elem.expanded = false;
        const like = await this.$axios.get(`/like/${elem.id}`)
        elem.liked = like.data.youLiked ? like.data.youLiked : false;
        elem.qtdLikes = like.data.qtdLikes;
        this.publications.push(elem)
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
  font: 2em sans-serif;
}
</style>
