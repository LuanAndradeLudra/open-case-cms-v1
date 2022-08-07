class Categories {
  async loadData() {
    if (this.param !== "") {
      const response = await this.$axios.get(`/categories/find/${this.param}`);
      const category = response.data.data;
      this.category.name = category.name;
      this.editingId = category._id;
      this.overlay = false;
    } else this.overlay = false;
  }

  create() {
    if (this.validate()) {
      this.loading = true;
      this.$axios
        .post("categories/create", this.category)
        .then(() => {
          this.$toast.open({
            message: "Nova categoria criada com sucesso!",
            type: "success",
            position: "top-right",
            duration: 4000,
          });
          this.$emit("page", { page: "/categories/list" });
        })
        .catch((err) => {
          this.loading = false;
          this.errorToast(
            err.response.data.error ?? "Erro ao criar nova categoria!"
          );
        });
    }
  }
  update() {
    if (this.validate()) {
      this.loading = true;
      this.$axios
        .put(`categories/update/${this.editingId}`, this.category)
        .then(() => {
          this.$toast.open({
            message: "Categoria atualizada com sucesso!",
            type: "success",
            position: "top-right",
            duration: 4000,
          });
          this.$emit("page", { page: "/categories/list" });
        })
        .catch((err) => {
          this.loading = false;
          this.errorToast(
            err.response.data.error ?? "Erro ao atualizar categoria!"
          );
        });
    }
  }

  validate() {
    this.$toast.clear();
    let next = true;
    let error = 0;
    function countError() {
      error++;
      next = false;
    }
    if (!this.nameState) {
      countError();
      if (error < 5) this.errorToast("Preencha o nome!");
    }
    return next;
  }
}

const categories = new Categories();

module.exports = {
  create: categories.create,
  update: categories.update,
  loadData: categories.loadData,
  validate: categories.validate,
};
