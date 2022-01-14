<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card
      v-for="pb in publications"
      :key="pb.id"
      class="my-card col-md-4 offset-md-4"
      flat
      bordered
    >
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />

      <q-card-section>
        <div class="text-overline text-orange-9">Overline</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ pb.address }}</div>
        <div class="text-caption text-grey">
          {{ pb.description }}
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn
          flat
          round
          color="dark"
          :icon="pb.liked ? 'favorite' : 'favorite_border'"
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
          <q-input
            type="text"
            v-model="pb.comentario"
            label="Digite um comentário"
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
  </div>
</template>
<script>
export default {
  name: "Feed",
  data() {
    return {
      name: "",
      password: "",
      lorem: "aaaaa",
      publications: [{ comments: [{ id: "" }] }],
      expanded: true,
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
  async mounted() {
    this.boot();
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
    async boot() {
      this.$store.dispatch("AUTH_PAYLOAD")
      const req = await this.$axios.get("/publications", {
        headers: {
          Authorization: `Bearer ${this.$store.getters["auth/getToken"]}`
        }
      });
      this.publications = req.data.map(elem => {
        elem.expanded = false;
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
