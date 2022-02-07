<template>
  <q-card flat bordered>
    <q-carousel
      v-model="slide"
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
        v-for="pet in pets"
        :key="pet.id"
        :name="pets.indexOf(pet)"
        class="column no-wrap"
      >
        <!-- <div class="row fit justify-start items-center  no-wrap"> -->
        <q-img
          height="300px"
          v-if="pet.pics"
          :src="`data:image/png;base64,${pet.pics}`"
        />
        <div class="text-h5 q-mt-sm q-mb-xs">{{ pet.name }}</div>
        <div class="text-caption text-grey">{{ pet.age }} anos</div>
        <!-- </div> -->
      </q-carousel-slide>
    </q-carousel>
    <q-separator />
    <q-card-section>
      <div v-if="canEdit">
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

            <q-item clickable v-close-popup @click="excluir()">
              <q-item-section avatar>
                <q-avatar icon="delete" color="negative" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Excluir</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <div class="text-overline text-orange-9">{{ zipcode }}</div>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ address }}</div>
      <div class="text-caption text-grey">
        {{ description }}
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-badge
        outline
        color="primary"
        :label="`${qtdLikes} ${qtdLikes > 1 ? 'curtidas' : 'curtida'}`"
      />
      <q-badge
        outline
        color="dark"
        :label="
          `${comments.length} ${
            comments.length > 1 ? 'comentários' : 'comentário'
          }`
        "
      />
    </q-card-section>
    <q-separator />
    <q-card-actions v-if="!canEdit">
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
        :icon="liked ? 'favorite' : 'favorite_border'"
        @click="like()"
      />
      <q-separator vertical />
      <q-btn
        flat
        color="primary"
        label="Comentarios"
        @click="expanded = !expanded"
      />

      <q-space />
    </q-card-actions>

    <q-slide-transition>
      <div v-show="expanded">
        <div v-for="comment in comments" :key="comment.id">
          <q-separator />
          <q-card-section class="text-subitle2">
            <b>{{ comment.user.username }}: </b>
            {{ comment.content }}
          </q-card-section>
        </div>
        <q-separator />
        <q-input
          type="text"
          v-model="comentario_input"
          label="Digite um comentário"
          class="input-comment"
          v-on:keyup.enter="sendComentario()"
        >
        </q-input>
        <q-btn
          flat
          round
          color="dark"
          @click="sendComentario()"
          :icon="'send'"
        />
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script>
export default {
  name: "PetCard",
  data() {
    return {
      id: this._id_p || 1,
      liked: this.liked_p || false,
      slide: this.slide_p || 0,
      expanded: this.expanded_p || false,
      zipcode: this.zipcode_p || "",
      address: this.address_p || "",
      description: this.description_p || "",
      qtdLikes: this.qtdLikes_p || 0,
      comentario_input: "",
      pets: this.pets_p || [{ name: "", age: "" }],
      comments: [{ id: "", user: { username: "" }, content: "" }],
      user: { id: "", name: "" }
    };
  },

  props: {
    userLogged:{
        type:String,
        required:true
    },
    id_p: {
      type: Number,
      required: true
    },
    canEdit: {
      type: Boolean,
      required: true,
      default: false
    },
    slide_p: {
      type: Number,
      required: true,
      default: 0
    },

    expanded_p: {
      type: Boolean,
      default: false
    },

    zipcode_p: {
      type: String,
      default: "Endereço não informado"
    },
    liked_p: {
      type: Boolean,
      required: true,
      default: false
    },
    qtdLikes_p: {
      type: Number,
      default: 0
    },
    address_p: {
      type: String,
      default: ""
    },
    pets_p: {
      type: Array,
      default: () => {
        return [{ name: "", age: "" }];
      }
    },
    user_p: {
      type: Object,
      default: () => {
        return { id: "", name: "" };
      }
    },

    comments_p: {
      type: Array,
      default: () => {
        return [{ id: "", user: { username: "" }, content: "" }];
      }
    }
  },
  mounted() {
    this.comments = this.comments_p;
    this.user = this.user_p;
    this.pets = this.pets;
  },
  methods: {
    async excluir() {
      await this.$axios.delete(`/publications/${this.id_p}`);
      this.boot();
    },
    async like() {
      const req = await this.$axios.post(`like/${this.id_p}`, {});
      this.liked = req.data.youLiked ? req.data.youLiked : false;
      this.qtdLikes = req.data.qtdLikes;
      console.log(req.data);
    },
    async sendComentario() {
      const req = await this.$axios.post(
        `/comment/${this.id_p}`,
        { message: this.comentario_input },
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/getToken"]}`
          }
        }
      );
      let comment = {
        id: "",
        user: { username: this.userLogged },
        content: this.comentario_input
      };
      this.comments.push(comment);
      this.comentario_input = "";
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
