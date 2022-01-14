<template>
  <div class="q-pa-md">
    <div class="row ">
      <q-card class="my-card col-md-4 offset-md-4 ">
        <q-card-section>
          <div v-for="pet in pets" :key="pet">
            <q-input v-model="pet.name" label="Nome do Pet" />
            <q-input v-model="pet.age" label="idade do Pet" />
            <p>Selecione uma foto para seu pet</p>
            <q-input
              type="file"
              accept="image/jpeg"
              @change="uploadImage($event,pet)"
            ></q-input>
          </div>
          <q-btn
            color="primary"
            label="Adicionar mais um pet"
            @click="adicionarPet"
          />
          <q-input v-model="address" label="Endereço" />
          <q-input v-model="zipcode" label="Zipcode" />
          <q-input v-model="description" label="descricao" />
        </q-card-section>
        <q-card-section>
          <q-btn
            color="primary"
            label="Enviar"
            @click="publicar"
            :loading="isLoading"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Publicacao",
  data() {
    return {
      description: "",
      address: "",
      zipcode: "",
      pets: [
        {
          name: "",
          pics: "",
          age: ""
        }
      ],
      name: "",
      password: "",
      isLoading: false
    };
  },
  beforeCreate() {
    // const isAuth = this.$store.getters['auth/isAuthenticated']
    // if(isAuth){
    //   this.$router.push({ path: "feed" });
    //   console.log("está logado")
    //   console.log(isAuth)
    // }
    // console.log('beforeCreate')
  },
  created() {
    // console.log('created')
    // console.log(this.$moment().format('MMMM Do YYYY, h:mm:ss a'))
  },
  beforeMount() {
    // console.log('beforeMount')
  },
  mounted() {
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
    async publicar() {
       const req = await this.$axios.post(
        `/publications`,
        { 
          description: this.description,
          address:this.address,
          zipcode:this.zipcode,
          pets: this.pets
         },
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/getToken"]}`
          }
        }
      );
      this.$router.push({path:"/feed"})
    },
    adicionarPet() {
     this.pets.push( {
          name: "",
          pics: "",
          age: ""
        })
    },
    uploadImage(e,pet) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.previewImage = e.target.result;
        pet.pics=this.previewImage
        console.log(this.previewImage);
      };
    }
  }
};
</script>
