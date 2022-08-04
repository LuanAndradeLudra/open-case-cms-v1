<template>
  <div class="page-weapons-create">
    <b-overlay :show="overlay" rounded="sm" variant="transparent" blur="1px">
      <div class="box">Criar nova arma</div>
      <div class="box mt-3">
        <b-row>
          <b-col cols="6">
            <label for="input-name">Nome:</label>
            <b-form-input
              id="input-name"
              v-model="weapon.name"
              :state="nameState"
              placeholder="Digite o nome"
            ></b-form-input>
          </b-col>
          <b-col cols="3">
            <label for="input-type">Tipo:</label>
            <model-select
              :options="options.item_type"
              v-model="weapon.item_type"
            />
          </b-col>
          <b-col cols="3">
            <label for="input-rarity">Raridade:</label>
            <model-select
              :options="options.item_rarity"
              v-model="weapon.item_rarity"
            />
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col cols="3">
            <label for="input-fn">Factory New (Preço):</label>
            <b-form-input
              id="input-fn"
              v-model="weapon.item_price.factory_new"
              :state="factoryNewState"
              placeholder="Digite o valor do factory new"
              v-money="masks.price"
            ></b-form-input>
          </b-col>
          <b-col cols="3">
            <label for="input-fnst">Factory New StatTrak (Preço):</label>
            <b-form-input
              id="input-fnst"
              v-model="weapon.item_price.factory_new_st"
              :state="factoryNewStState"
              placeholder="Digite o valor do factory new startrak"
              v-money="masks.price"
            ></b-form-input>
          </b-col>
          <b-col cols="3">
            <label for="input-mw">Minimal Wear (Preço):</label>
            <b-form-input
              id="input-mw"
              v-model="weapon.item_price.minimal_wear"
              :state="minimalWearState"
              placeholder="Digite o valor do minimal wear"
              v-money="masks.price"
            ></b-form-input>
          </b-col>
          <b-col cols="3">
            <label for="input-mwst">Minimal Wear StatTrak (Preço):</label>
            <b-form-input
              id="input-mwst"
              v-model="weapon.item_price.minimal_wear_st"
              :state="minimalWearStState"
              placeholder="Digite o valor do minimal wear startrak"
              v-money="masks.price"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col cols="3">
            <label for="input-ft">Field Tested (Preço):</label>
            <b-form-input
              id="input-ft"
              v-model="weapon.item_price.field_tested"
              :state="fieldTestedState"
              placeholder="Digite o valor do field tested"
              v-money="masks.price"
            ></b-form-input>
          </b-col>
          <b-col cols="3">
            <label for="input-ftst">Field Tested StatTrak (Preço):</label>
            <b-form-input
              id="input-ftst"
              v-model="weapon.item_price.field_tested_st"
              :state="fieldTestedStState"
              placeholder="Digite o valor do field tested stattrak"
              v-money="masks.price"
            ></b-form-input>
          </b-col>
          <b-col cols="3">
            <label for="input-ww">Well Worn (Preço):</label>
            <b-form-input
              id="input-ww"
              v-model="weapon.item_price.well_worn"
              :state="wellWornState"
              placeholder="Digite o valor do well worn"
              v-money="masks.price"
            ></b-form-input>
          </b-col>
          <b-col cols="3">
            <label for="input-wwst">Well Worn StatTrak (Preço):</label>
            <b-form-input
              id="input-wwst"
              v-model="weapon.item_price.well_worn_st"
              :state="wellWornStState"
              placeholder="Digite o valor do well worn stattrak"
              v-money="masks.price"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col cols="3">
            <label for="input-bs">Battle Scarred (Preço):</label>
            <b-form-input
              id="input-bs"
              v-model="weapon.item_price.battle_scarred"
              :state="battleScarredState"
              placeholder="Digite o valor do battle scarred"
              v-money="masks.price"
            ></b-form-input>
          </b-col>
          <b-col cols="3">
            <label for="input-bsst">Battle Scarred StatTrak (Preço):</label>
            <b-form-input
              id="input-bsst"
              v-model="weapon.item_price.battle_scarred_st"
              :state="battleScarredStState"
              placeholder="Digite o valor do battle scarred stattrak"
              v-money="masks.price"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col>
            <label for="input-image">Imagem:</label>
            <b-form-file
              id="input-image"
              ref="inputLogo"
              accept="image/png"
              placeholder="Selecione a imagem"
              drop-placeholder="Solte o arquivo aqui"
              @change="onFileChange"
            ></b-form-file>
            <button
              v-if="editingId === ''"
              class="my-btn mt-4 btn-block"
              @click="loading ? null : create()"
            >
              <span v-if="!loading">Salvar</span>
              <b-spinner v-else variant="secondary"></b-spinner>
            </button>
            <button
              v-else
              class="my-btn mt-4 btn-block"
              @click="loading ? null : update()"
            >
              <span v-if="!loading">Editar</span>
              <b-spinner v-else variant="secondary"></b-spinner>
            </button>
          </b-col>
          <b-col v-if="imageUrl !== ''">
            <div
              class="image-exiber"
              :style="{
                backgroundImage: `url(${imageUrl})`,
              }"
            ></div>
          </b-col>
        </b-row>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import validator from "~/helpers/validator";
import weaponController from "~/controller/weapon.js";

// Data
import weaponsType from "~/data/weaponsType.js";
import weaponsRarity from "~/data/weaponsRarity.js";

// Utils
import errorToast from "~/helpers/errorToast";

// Components
import { ModelSelect } from "vue-search-select";
import "vue-search-select/dist/VueSearchSelect.css";

export default {
  components: { ModelSelect },
  data() {
    return {
      overlay: true,
      loading: false,
      imageUrl: "",
      editingId: "",
      weapon: {
        name: "",
        image: "",
        item_type: "",
        item_rarity: "",
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
      options: {
        item_type: weaponsType,
        item_rarity: weaponsRarity,
      },
      masks: {
        price: {
          decimal: ".",
          thousands: "",
          prefix: "R$ ",
          precision: 2,
        },
        rate: {
          decimal: ".",
          thousands: "",
          suffix: " %",
          precision: 3,
        },
      },
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    nameState() {
      return validator.isNotEmpty(this.weapon.name);
    },
    imageState() {
      return validator.isNotEmpty(this.weapon.image);
    },
    itemTypeState() {
      return validator.isNotEmpty(this.weapon.item_type);
    },
    itemRarityState() {
      return validator.isNotEmpty(this.weapon.item_rarity);
    },
    dropRateState() {
      return validator.isRate(this.weapon.drop_rate);
    },
    factoryNewState() {
      return validator.isPrice(this.weapon.item_price.factory_new);
    },
    factoryNewStState() {
      return validator.isPrice(this.weapon.item_price.factory_new_st);
    },
    minimalWearState() {
      return validator.isPrice(this.weapon.item_price.minimal_wear);
    },
    minimalWearStState() {
      return validator.isPrice(this.weapon.item_price.minimal_wear_st);
    },
    fieldTestedState() {
      return validator.isPrice(this.weapon.item_price.field_tested);
    },
    fieldTestedStState() {
      return validator.isPrice(this.weapon.item_price.field_tested_st);
    },
    wellWornState() {
      return validator.isPrice(this.weapon.item_price.well_worn);
    },
    wellWornStState() {
      return validator.isPrice(this.weapon.item_price.well_worn_st);
    },
    battleScarredState() {
      return validator.isPrice(this.weapon.item_price.battle_scarred);
    },
    battleScarredStState() {
      return validator.isPrice(this.weapon.item_price.battle_scarred_st);
    },
  },
  methods: {
    ...weaponController,
    errorToast,
    onFileChange(e) {
      if (e.target.files[0] && e.target.files[0].type === "image/png") {
        if (e.target.files[0].size > 4 * 1024 * 1024) {
          this.imageUrl = "";
          this.errorToast("A imagem escolhida é muito grande!");
        } else {
          this.weapon.image = e.target.files[0];
          this.imageUrl = URL.createObjectURL(e.target.files[0]);
        }
      }
    },
  },
};
</script>
