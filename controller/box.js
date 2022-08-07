const validator = require("~/helpers/validator");
class Box {
  async loadData() {
    if (this.param !== "") {
      try {
        const response = await this.$axios.get(`/box/find/${this.param}`);
        const box = response.data.data;
        this.editingId = box._id;
        this.box.name = box.name;
        this.box.price = `R$ ${box.price.toFixed(2)}`;
        if (box.category) this.box.category = box.category._id;
        if (box.discount) this.box.discount = `${box.discount} %`;
        this.box.image = "same";
        box.weapons.forEach((weaponItem) => {
          this.box.weapons.push({
            weapon: weaponItem.weapon._id,
            drop_rate: `${weaponItem.drop_rate.toFixed(3)} %`,
          });
        });
        this.imageUrl = `${this.$config.env.storageUrl}box/${box.image.preview}`;
        this.recalculateDropRateTotal();
        this.overlay = false;
      } catch (e) {
        this.$toast.open({
          message: "Erro ao carregar dados!",
          type: "error",
          position: "top-right",
          duration: 4000,
        });
      }
    } else this.overlay = false;
  }

  async loadWeapons() {
    try {
      const response = await this.$axios.get("/weapon/list");
      const weapons = response.data.data;
      weapons.forEach((weapon) => {
        this.weapons.push({
          value: weapon._id,
          text: `${weapon.item_type} - ${weapon.name}`,
        });
      });
      this.overlay = false;
    } catch (err) {
      this.errorToast(
        err.response.data.error ??
          "Houve um erro ao carregar a lista de weapons"
      );
    }
  }

  async loadCategories() {
    try {
      const response = await this.$axios.get("/categories/list");
      const categories = response.data.data;
      categories.forEach((category) => {
        this.categories.push({
          value: category._id,
          text: `${category.name}`,
        });
      });
      this.overlay = false;
    } catch (e) {
      this.errorToast(
        err.response.data.error ??
          "Houve um erro ao carregar a lista de categorias"
      );
    }
  }

  async create() {
    if (this.validate()) {
      this.loading = true;
      const formData = this.createPayload();
      this.$axios
        .post("box/create", formData)
        .then(() => {
          this.$toast.open({
            message: "Nova box criada com sucesso!",
            type: "success",
            position: "top-right",
            duration: 4000,
          });
          this.$emit("page", { page: "/box/list" });
        })
        .catch((err) => {
          this.loading = false;
          this.errorToast(err.response.data.error ?? "Erro ao criar nova box!");
        });
    }
  }

  async update() {
    if (this.validate()) {
      this.loading = true;
      const formData = this.createPayload();
      this.$axios
        .put(`box/update/${this.editingId}`, formData)
        .then(() => {
          this.$toast.open({
            message: "Box atualizada com sucesso!",
            type: "success",
            position: "top-right",
            duration: 4000,
          });
          this.$emit("page", { page: "/box/list" });
        })
        .catch((err) => {
          this.loading = false;
          this.errorToast(err.response.data.error ?? "Erro ao atualizar box!");
        });
    }
  }

  createPayload() {
    const formData = new FormData();
    formData.append("name", this.box.name);
    formData.append("price", this.box.price);
    if (validator.isNotEmpty(validator.cleanRate(this.box.discount)))
      formData.append("discount", this.box.discount);
    if (this.box.category !== "")
      formData.append("category", this.box.category);
    formData.append("weapons", JSON.stringify(this.box.weapons));
    if (this.box.image !== "same") formData.append("image", this.box.image);
    return formData;
  }

  recalculateDropRateTotal() {
    this.drop_rate_box_total = 100;
    this.box.weapons.forEach((weapon) => {
      this.drop_rate_box_total = (
        this.drop_rate_box_total - validator.cleanRate(weapon.drop_rate)
      ).toFixed(3);
    });
    if (this.drop_rate_box_total < 0) {
      this.$toast.clear();
      this.errorToast("A caixa excede o limite de chance de drop!");
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
    if (!this.priceState) {
      countError();
      if (error < 5) this.errorToast("Preencha o preço!");
    }
    if (!this.discountState && this.discountState !== null) {
      countError();
      if (error < 5) this.errorToast("Preencha corretamente o desconto!");
    }
    if (!this.box.image) {
      countError();
      if (error < 5) this.errorToast("Selecione uma imagem!");
    }
    if (this.box.weapons.length < 2) {
      countError();
      if (error < 5) this.errorToast(`A caixa precisa ter pelo menos 2 itens!`);
    } else {
      this.box.weapons.forEach((item, index) => {
        const items = this.box.weapons.filter(
          (weapon) => weapon.weapon === item.weapon
        );
        if (items.length > 1) {
          countError();
          if (error < 5) this.errorToast(`O item ${index + 1} se repete!`);
        }
        if (!validator.isNotEmpty(item.weapon)) {
          countError();
          if (error < 5)
            this.errorToast(
              `Preencha o nome corretamente no item ${index + 1}!`
            );
        }
        if (!validator.isRate(item.drop_rate)) {
          countError();
          if (error < 5)
            this.errorToast(
              `Preencha a chance de drop corretamente no item ${index + 1}!`
            );
        }
      });
      if (this.drop_rate_box_total > 0) {
        countError();
        if (error < 5)
          this.errorToast(
            `A soma das chances de drop precisa ser igual a 100!`
          );
      }
    }

    return next;
  }
}

const box = new Box();

module.exports = {
  loadWeapons: box.loadWeapons,
  create: box.create,
  recalculateDropRateTotal: box.recalculateDropRateTotal,
  validate: box.validate,
  createPayload: box.createPayload,
  loadData: box.loadData,
  update: box.update,
  loadCategories: box.loadCategories,
};
