<template>
  <div >
    <div v-if="publications_p && publications_p.length>1" class="q-pa-md row items-start q-gutter-md">
    <PetCard v-for="pb in publications_p" :key="pb.id"  v-bind="pb"  class="my-card col-md-4 offset-md-1 "/>
    </div>

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
import PetCard from '../components/PetCard.vue'
export default {

  name: "Feed",
  components: {
    PetCard: PetCard
  },
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
      // publications_p: this.publicationsToCard(),
      publications_p:[{
          id:0,
          canEdit: false,
          slide_p: 0,
          expanded_p: 0,
          zipcode_p: "",
          qtdLikes_p: 0,
          address_p:"publications[0].address",
          pets_p: [{ name: "", age: "" }],
          user_p: { id: "", name: "" },
          comments_p:  [{ id: "", user: { username: "" }, content: "" }]
        }],
      expanded: true,
      isLoading: false,
      slide: 1,
      fullscreen: false
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
 async  mounted() {
    // this.publications.forEach(this.publications =)
    // console.log('mounted')
    
  await this.boot();

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
      this.publications_p = [];
      req.data.forEach(async elem => {
        elem.expanded = false;
        elem.slide = 0;
        const like = await this.$axios.get(`/like/${elem.id}`);
        elem.liked = like.data.youLiked ? like.data.youLiked : false;
        elem.qtdLikes = like.data.qtdLikes;
        elem.canEdit = this.canEdit(elem)
        this.publications.push(elem);
        this.publications_p.push(this.publicationsToCard(elem))
        return elem;
      });
      // this.publications_p = this.publicationsToCard()
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
    }, 
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
  },
};
</script>

<style scoped>
.plus-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  font: 4em sans-serif;
}
</style>