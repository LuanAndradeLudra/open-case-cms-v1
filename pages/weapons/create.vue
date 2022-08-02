<template>
  <div class="page-weapons-create">
    <div class="box">Criar nova arma</div>
    <div class="box mt-3">
      <b-row>
        <b-col cols="6">
          <label for="input-name">Nome:</label>
          <b-form-input
            id="input-name"
            v-model="weapon.name"
            :state="null"
            placeholder="Digite o nome"
            trim
          ></b-form-input>
        </b-col>
        <b-col cols="3">
          <label for="input-type">Tipo:</label>
          <b-form-input
            id="input-type"
            v-model="weapon.item_type"
            :state="null"
            placeholder="Digite o tipo"
            trim
          ></b-form-input>
        </b-col>
        <b-col cols="3">
          <label for="input-tier">Tier:</label>
          <b-form-input
            id="input-tier"
            v-model="weapon.item_tier"
            :state="null"
            placeholder="Digite o tier"
            trim
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col cols="3">
          <label for="input-fn">Factory New (Preço):</label>
          <b-form-input
            id="input-fn"
            v-model="weapon.item_price.factory_new"
            :state="null"
            placeholder="Digite o valor do factory new"
            trim
          ></b-form-input>
        </b-col>
        <b-col cols="3">
          <label for="input-fnst">Factory New StatTrak (Preço):</label>
          <b-form-input
            id="input-fnst"
            v-model="weapon.item_price.factory_new_st"
            :state="null"
            placeholder="Digite o valor do factory new startrak"
            trim
          ></b-form-input>
        </b-col>
        <b-col cols="3">
          <label for="input-mw">Minimal Wear (Preço):</label>
          <b-form-input
            id="input-mw"
            v-model="weapon.item_price.minimal_wear"
            :state="null"
            placeholder="Digite o valor do minimal wear"
            trim
          ></b-form-input>
        </b-col>
        <b-col cols="3">
          <label for="input-mwst">Minimal Wear StatTrak (Preço):</label>
          <b-form-input
            id="input-mwst"
            v-model="weapon.item_price.minimal_wear_st"
            :state="null"
            placeholder="Digite o valor do minimal wear startrak"
            trim
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col cols="3">
          <label for="input-ft">Field Tested (Preço):</label>
          <b-form-input
            id="input-ft"
            v-model="weapon.item_price.field_tested"
            :state="null"
            placeholder="Digite o valor do field tested"
            trim
          ></b-form-input>
        </b-col>
        <b-col cols="3">
          <label for="input-ftst">Field Tested StatTrak (Preço):</label>
          <b-form-input
            id="input-ftst"
            v-model="weapon.item_price.field_tested_st"
            :state="null"
            placeholder="Digite o valor do field tested stattrak"
            trim
          ></b-form-input>
        </b-col>
        <b-col cols="3">
          <label for="input-ww">Well Worn (Preço):</label>
          <b-form-input
            id="input-ww"
            v-model="weapon.item_price.well_worn"
            :state="null"
            placeholder="Digite o valor do well worn"
            trim
          ></b-form-input>
        </b-col>
        <b-col cols="3">
          <label for="input-wwst">Well Worn StatTrak (Preço):</label>
          <b-form-input
            id="input-wwst"
            v-model="weapon.item_price.well_worn_st"
            :state="null"
            placeholder="Digite o valor do well worn stattrak"
            trim
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col cols="3">
          <label for="input-bs">Battle Scarred (Preço):</label>
          <b-form-input
            id="input-bs"
            v-model="weapon.item_price.battle_scarred"
            :state="null"
            placeholder="Digite o valor do battle scarred"
            trim
          ></b-form-input>
        </b-col>
        <b-col cols="3">
          <label for="input-bsst">Battle Scarred StatTrak (Preço):</label>
          <b-form-input
            id="input-bsst"
            v-model="weapon.item_price.battle_scarred_st"
            :state="null"
            placeholder="Digite o valor do battle scarred stattrak"
            trim
          ></b-form-input>
        </b-col>
        <b-col cols="6">
          <label for="input-rate">Taxa de drop:</label>
          <b-form-input
            id="input-rate"
            v-model="weapon.drop_rate"
            :state="null"
            placeholder="Digite o taxa de drop"
            trim
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col cols="6">
          <label for="input-image">Imagem:</label>
          <b-form-file
            id="input-image"
            ref="inputLogo"
            accept="image/png, image/jpeg"
            placeholder="Selecione a imagem"
            drop-placeholder="Solte o arquivo aqui"
            @change="onFileChange"
          ></b-form-file>
          <button class="mt-4 btn-block">Salvar</button>
        </b-col>
        <b-col cols="6">
          <div
            class="image-exiber"
            :style="{
              backgroundImage: `url(${imageUrl})`,
            }"
          ></div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      weapon: {
        name: "",
        image: "",
        item_type: "",
        item_tier: "",
        drop_rate: "",
        item_price: {
          factory_new: "",
          factory_new_st: "",
          minimal_wear: "",
          minimal_wear_st: "",
          field_tested: "",
          field_tested_st: "",
          well_worn: "",
          well_worn_st: "",
          battle_scarred: "",
          battle_scarred_st: "",
        },
      },
    };
  },
  methods: {
    onFileChange(e) {
      if (
        e.target.files[0] &&
        (e.target.files[0].type === "image/png" ||
          e.target.files[0].type === "image/jpeg")
      ) {
        if (e.target.files[0].size > 4 * 1024 * 1024) {
          this.imageUrl = "";
          this.$toast.open({
            message: "A imagem escolhida é muito grande!",
            type: "error",
            position: "top-right",
            duration: 4000,
          });
        } else {
          this.weapon.image = e.target.files[0];
          this.imageUrl = URL.createObjectURL(e.target.files[0]);
        }
      }
    },
  },
};
</script>
