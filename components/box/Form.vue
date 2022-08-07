<template>
  <div class="page-box-create">
    <b-overlay :show="overlay" rounded="sm" variant="transparent" blur="1px">
      <div class="box">
        <span v-if="!param">Criar</span> <span v-else>Editar</span> nova caixa
      </div>
      <div class="box mt-3">
        <b-row>
          <b-col xl="6" lg="12">
            <label for="input-name">Nome:</label>
            <b-form-input
              id="input-name"
              v-model="box.name"
              :state="nameState"
              placeholder="Digite o nome"
            ></b-form-input>
          </b-col>
          <b-col class="mt-3" xl="3" lg="6">
            <label for="input-price">Preço:</label>
            <b-form-input
              id="input-price"
              v-model="box.price"
              :state="priceState"
              placeholder="Digite o preço da caixa"
              v-money="masks.price"
            ></b-form-input>
          </b-col>
          <b-col class="mt-3" xl="3" lg="6">
            <label for="input-discount">Desconto:</label>
            <b-form-input
              id="input-discount"
              v-model="box.discount"
              :state="discountState"
              placeholder="Digite a taxa de desconto"
              v-money="masks.discount"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-col class="p-0 mt-3">
          <label for="input-collection">Coleção:</label>
          <model-select
            id="input-collection"
            v-model="box.category"
            :options="categories"
          />
        </b-col>
        <b-row class="mt-4">
          <b-col sm="7">
            Quantidade de chance disponível {{ drop_rate_box_total }} %
          </b-col>
          <b-col sm="5" class="d-flex justify-content-sm-end mt-3 mt-sm-0">
            <b-button class="btn-block" @click="box.weapons.push({})"
              ><b-icon icon="plus-circle" aria-hidden="true"></b-icon> Adicionar
              item</b-button
            >
          </b-col>
        </b-row>
        <b-row
          v-for="(_, index) in box.weapons"
          :key="index"
          class="mt-4 mt-lg-3 align-items-center"
          style="position: relative"
        >
          <b-col xl="9" lg="7">
            <label for="input-item"
              >Item:
              <b-icon
                class="ml-4 cursor-pointer"
                icon="trash-fill"
                aria-hidden="true"
                @click="box.weapons.splice(index, 1)"
              ></b-icon
            ></label>
            <model-select
              id="input-item"
              v-model="box.weapons[index].weapon"
              :options="weapons"
            />
          </b-col>
          <b-col xl="3" lg="5" class="mt-2 mt-lg-0">
            <label for="input-drop">Chance de drop:</label>
            <b-form-input
              id="input-drop"
              v-model="box.weapons[index].drop_rate"
              :maxlength="8"
              placeholder="Digite a chance de drop"
              @keyup="recalculateDropRateTotal()"
              v-money="masks.rate"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-5 mt-lg-4">
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
              <span v-if="!loading">Atualizar</span>
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
import boxController from "~/controller/box";
import validator from "~/helpers/validator";

// Utils
import errorToast from "~/helpers/errorToast";

// Components
import { ModelSelect } from "vue-search-select";
import "vue-search-select/dist/VueSearchSelect.css";

export default {
  components: { ModelSelect },
  props: {
    param: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loading: false,
      overlay: true,
      weapons: [],
      categories: [
        {
          value: "",
          text: "Sem coleção",
        },
      ],
      drop_rate_box_total: 100,
      imageUrl: "",
      editingId: "",
      box: {
        name: "",
        price: "",
        discount: "",
        category: "",
        image: "",
        weapons: [],
      },
      masks: {
        price: {
          decimal: ".",
          thousands: "",
          prefix: "R$ ",
          precision: 2,
        },
        discount: { precision: 0, thousands: "", suffix: " %" },
        rate: { precision: 3, thousands: "", suffix: " %" },
      },
    };
  },
  created() {
    this.loadWeapons();
    this.loadCategories();
    this.loadData();
  },
  computed: {
    nameState() {
      return validator.isNotEmpty(this.box.name);
    },
    priceState() {
      return validator.isPrice(this.box.price);
    },
    discountState() {
      return validator.isDiscount(this.box.discount);
    },
  },
  methods: {
    ...boxController,
    errorToast,
    onFileChange(e) {
      if (e.target.files[0] && e.target.files[0].type === "image/png") {
        if (e.target.files[0].size > 4 * 1024 * 1024) {
          this.imageUrl = "";
          this.errorToast("A imagem escolhida é muito grande!");
        } else {
          this.box.image = e.target.files[0];
          this.imageUrl = URL.createObjectURL(e.target.files[0]);
        }
      }
    },
  },
};
</script>
