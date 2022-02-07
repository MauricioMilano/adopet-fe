<template>
  <div class="row">
    <q-card class="my-card offset-1 col-md-10 " flat bordered>

      
      <q-item>
        <q-item-section avatar>
          <!-- <q-avatar> -->
            <img v-if="picture" width="150px" :src="`data:image/png;base64,${picture}`" />
          <!-- </q-avatar> -->
        </q-item-section>

        <q-item-section>
          <q-item-label><h6>{{ username }}</h6></q-item-label>
          <q-item-label caption>
            {{ email }}
          </q-item-label>
        </q-item-section>
      </q-item>
        <span class="separator"> -</span>
      <q-item>
        <q-item-section>
          <q-item-label><h5>Minhas publicações</h5></q-item-label>
          <q-item-label>
             <div class="row">
             <PetCard v-for="pb in myPublications" :key="pb.id"  v-bind="pb"  class="my-card col-md-4 offset-md-1 "/>
             </div>
             </q-item-label>
        </q-item-section></q-item
      >
      <q-separator />
    </q-card>
  </div>
</template>

<script>
import PetCard from '../components/PetCard.vue'

export default {
  name: "perfil",
   components: {
    PetCard: PetCard
  },
  data() {
    return {
      username: "",
      role: [],
      picture: "",
      email: "",
      myPublications:[],
      userLogged: this.$store.getters["auth/getUser"]
    };
  },
  async mounted() {
    this.$axios.defaults.headers.common.Authorization = `Bearer ${this.$store.getters["auth/getToken"]}`;
    const req = await this.$axios.get("/profile");
    this.username = req.data.username;
    this.role = req.data.roles;
    this.email = req.data.email;
    this.picture = req.data.picture;
    const myPublications = await this.$axios.get("/myPublications")
    this.myPublications = []
    myPublications.data.forEach( async elem => {
      elem.expanded = false;
        elem.slide = 0;
        const like = await this.$axios.get(`/like/${elem.id}`);
        elem.liked = like.data.youLiked ? like.data.youLiked : false;
        elem.qtdLikes = like.data.qtdLikes;
        elem.canEdit = true
        this.myPublications.push(this.publicationsToCard(elem))
    });
  },
  methods:{
    publicationsToCard(publication){
        return {
          userLogged: this.userLogged,
          id_p:publication.id,
          canEdit: publication.canEdit,
          slide_p: publication.slide,
          liked_p: publication.liked,
          expanded_p: publication.expanded,
          zipcode_p: publication.zipcode,
          qtdLikes_p: publication.qtdLikes,
          address_p:publication.address,
          pets_p:publication.pets,
          user_p: publication.user,
          comments_p: publication.comments || []
        }
    }
  }
};
</script>
<style scoped>
.separator {
    width: 100%;
    height: 2px;
    display: block;
    background: black;
}
</style>