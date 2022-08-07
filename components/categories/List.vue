<template>
  <div class="page-box-list">
    <b-modal
      ref="my-modal"
      hide-footer
      header-bg-variant="dark"
      body-bg-variant="dark"
      no-close-on-backdrop
      no-close-on-esc
      hide-header-close
    >
      <div class="d-block text-center">
        <h5>
          Você está prestes a excluir <br />
          {{ deleting.name }}
        </h5>
      </div>
      <div class="mt-4">
        <center>
          <b-button @click="cancelDeleting()">Cancelar</b-button>
          <b-button @click="confirmDeleting()">Confirmar</b-button>
        </center>
      </div>
    </b-modal>
    <div class="box">Lista de categorias</div>
    <div class="box mt-3 box-full">
      <b-input
        v-model="filter"
        class="mb-2"
        placeholder="Pesquise por um item"
      />
      <b-table
        table-variant="dark"
        :busy="overlay"
        :items="items"
        :fields="fields"
        :filter="filter"
        responsive
        striped
        borderless
        foot-clone
        hover
      >
      <template #cell(boxes)="data">
          <p>{{data.item.boxes.length}}</p>
        </template>
        <template #cell(actions)="data">
          <b-button-group size="sm" style="gap: 20px">
            <b-button @click="editCategorie(data.item)">Editar</b-button>
            <b-button @click="deleteCategorie(data.item)">Excluir</b-button>
          </b-button-group>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  data() {
    return {
      overlay: true,
      filter: "",
      fields: [
        { key: "name", label: "Nome" },
        { key: "boxes", label: "Caixas" },
        { key: "actions", label: "Ações" },
      ],
      items: [],
      deleting: {},
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        const response = await this.$axios.get("categories/listbox");
        
        const items = response.data.data.filter((item) => item.name !== "Todas")
        this.items = items;
        this.overlay = false;
      } catch (e) {
        this.$toast.open({
          message: "Erro ao carregar dados!",
          type: "error",
          position: "top-right",
          duration: 4000,
        });
      }
    },
    editCategorie(item) {
      this.$emit(`page`, { page: "/categories/edit", param: item._id });
    },
    deleteCategorie(item) {
      this.deleting = item;
      this.$refs["my-modal"].show();
    },
    cancelDeleting() {
      this.deleting = {};
      this.$refs["my-modal"].hide();
    },
    async confirmDeleting() {
      try {
        this.overlay = true;
        this.$refs["my-modal"].hide();
        await this.$axios.delete(`/categories/delete/${this.deleting._id}`);
        this.$toast.open({
          message: "Categoria deletada com sucesso!",
          type: "success",
          position: "top-right",
          duration: 4000,
        });
        this.loadData();
      } catch (e) {
        this.overlay = false;
        this.$toast.open({
          message: "Erro ao deletar categoria!",
          type: "error",
          position: "top-right",
          duration: 4000,
        });
      }
    },
  },
};
</script>
