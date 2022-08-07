<template>
  <div class="page-box-create">
    <b-overlay :show="overlay" rounded="sm" variant="transparent" blur="1px">
      <div class="box">
        <span v-if="!param">Criar</span> <span v-else>Editar</span> nova categoria
      </div>
      <div class="box mt-3">
        <b-col>
          <label for="input-name">Nome:</label>
          <b-form-input
            id="input-name"
            v-model="category.name"
            :state="nameState"
            placeholder="Digite o nome"
          ></b-form-input>
        </b-col>
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
      </div>
    </b-overlay>
  </div>
</template>

<script>
import validator from "~/helpers/validator";
import categoriesController from "~/controller/categories";

// Utils
import errorToast from "~/helpers/errorToast";

export default {
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
      editingId: "",
      category: {
        name: "",
      },
    };
  },
  computed: {
    nameState() {
      return validator.isNotEmpty(this.category.name);
    },
  },
  created() {
    this.loadData()
  },
  methods: {
     errorToast,
    ...categoriesController,
  },
};
</script>
