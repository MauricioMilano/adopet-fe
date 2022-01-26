<template>
  <div class="q-pa-md">
    <div class="text-h4 text-center margin">
      Cadastre seu pet para achar um novo dono!
    </div>
    <div class="row">
      <q-stepper
        v-model="step"
        vertical
        color="primary"
        animated
        class="col-md-4 offset-md-4 "
      >
        <q-step
          :name="1"
          title="Dados de endereço"
          icon="home"
          :done="step > 1"
        >
          <q-input v-model="address"  :rules="[ myRule ]" label="Endereço" />
          <q-input v-model="zipcode"  :rules="[ myRule ]" label="Zipcode" mask="#####-###"/>
          <q-input v-model="description"  :rules="[ myRule ]" label="descricao" />

          <q-stepper-navigation>
            <q-btn @click="step = 2" color="primary" label="Próximo" />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="2"
          title="Adicione seus pets"
          caption="Optional"
          icon="pets"
          :done="step > 2"
        >
          <div v-for="pet in pets" :key="pet">
            <q-btn
              color="primary"
              v-if="pets.indexOf(pet) >= 1"
              label="Remover pet abaixo"
              icon="close"
              @click="removerPet(pet)"
            /><q-separator />
            <q-input v-model="pet.name"  :rules="[ myRule ]" label="Nome do Pet" />
            <q-input v-model="pet.age"  :rules="[ myRule ]" type="number" mask="##" suffix="anos" label="idade do Pet" />
            <p>Selecione uma foto para seu pet</p>
            <q-input
              type="file"
              accept="image/jpeg"
              @change="uploadImage($event, pet)"
            ></q-input>
          </div>
           <q-btn
            color="primary"
            label="Adicionar mais um pet"
            @click="adicionarPet"
          />
          <q-stepper-navigation>
            <q-btn @click="step = 3" color="primary" label="Próximo" />
            <q-btn
              flat
              @click="step = 1"
              color="primary"
              label="Voltar"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step :name="3" title="Visualizar pets" icon="visibility">
          <q-card
            v-for="pet in pets"
            :key="pet.id"
            class="my-card"
            flat
            bordered
          >
           <q-img
        height="300px"
        v-if="pet.pics"
        :src="`${pet.pics}`"
      />
            <div class="text-h5 q-mt-sm q-mb-xs">{{ pet.name }}</div>
      <div class="text-caption text-grey">
          {{ pet.age }}
      </div>
          </q-card>

          <q-stepper-navigation>
            <q-btn color="primary" label="Publicar" @click="publicar" />
            <q-btn
              flat
              @click="step = 2"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </div>
    <!-- <div class="row ">
      <q-card class="my-card col-md-4 offset-md-4 ">
        <div class="text-h4 text-center margin q-mt-sm q-mb-xs">Conte nos</div>
        <q-card-section>
          <div v-for="pet in pets" :key="pet">
            <q-input v-model="pet.name" label="Nome do Pet" />
            <q-input v-model="pet.age" label="idade do Pet" />
            <p>Selecione uma foto para seu pet</p>
            <q-input
              type="file"
              accept="image/jpeg"
              @change="uploadImage($event, pet)"
            ></q-input>
            <q-btn color="primary" icon="close" @click="removerPet(pet)" />
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
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Publicacao",
  data() {
    return {
      step: 1,
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
  methods: {
    myRule (val) {
      // simulating a delay

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // call
          //  resolve(true)
          //     --> content is valid
          //  resolve(false)
          //     --> content is NOT valid, no error message
          //  resolve(error_message)
          //     --> content is NOT valid, we have error message
          resolve(!!val || '* Required')

          // calling reject(...) will also mark the input
          // as having an error, but there will not be any
          // error message displayed below the input
          // (only in browser console)
        }, 500)
      })
    },
    async publicar() {
      if(!this.description || !this.address || !this.zipcode ){
        this.step = 1 
        return
      }
      const req = await this.$axios.post(
        `/publications`,
        {
          description: this.description,
          address: this.address,
          zipcode: this.zipcode,
          pets: this.pets
        },
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/getToken"]}`
          }
        }
      );
      this.$router.push({ path: "/feed" });
    },
    adicionarPet() {
      this.pets.push({
        name: "",
        pics: "",
        age: ""
      });
    },
    uploadImage(e, pet) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.previewImage = e.target.result;
        pet.pics = this.previewImage;
        console.log(this.previewImage);
      };
    },
    removerPet(pet) {
      let idx = this.pets.indexOf(pet);
      if (idx > -1) this.pets.shift(pet);
    }
  }
};
</script>
