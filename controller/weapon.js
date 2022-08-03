class Weapon {
  async loadData() {
    if (this.$route.query.weapon) {
      try {
        const response = await this.$axios.get(
          `/weapon/find/${this.$route.query.weapon}`
        );
        const weapon = response.data.data;
        this.editingId = weapon._id;
        this.weapon.name = weapon.name;
        this.weapon.item_type = weapon.item_type;
        this.weapon.item_rarity = weapon.item_rarity;
        Object.keys(weapon.item_price).forEach((key) => {
          weapon.item_price[key] = `R$ ${weapon.item_price[key]}`;
        });
        this.weapon.item_price = weapon.item_price;
        this.weapon.image = "same";
        this.imageUrl = `${this.$config.env.storageUrl}weapons/${weapon.image.preview}`;
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
  async create() {
    if (this.validate()) {
      this.loading = true;
      const formData = this.createPayload();
      this.$axios
        .post("weapon/create", formData)
        .then(() => {
          this.$toast.open({
            message: "Novo weapon criado com sucesso!",
            type: "success",
            position: "top-right",
            duration: 4000,
          });
          this.$router.push("/weapons/list");
        })
        .catch((err) => {
          this.loading = false;
          this.errorToast(err ?? "Erro ao criar novo weapon!");
        });
    }
  }
  async update() {
    if (this.validate()) {
      this.loading = true;
      const formData = this.createPayload();
      this.$axios
        .put(`weapon/update/${this.editingId}`, formData)
        .then(() => {
          this.$toast.open({
            message: "Weapon atualizado com sucesso!",
            type: "success",
            position: "top-right",
            duration: 4000,
          });
          this.$router.push("/weapons/list");
        })
        .catch((err) => {
          this.loading = false;
          this.errorToast(err ?? "Erro ao atualizar weapon!");
        });
    }
  }
  createPayload() {
    const formData = new FormData();
    if (this.editingId) formData.append("id", this.editingId);
    formData.append("name", this.weapon.name);
    if (this.weapon.image !== "same")
      formData.append("image", this.weapon.image);
    formData.append("item_type", this.weapon.item_type);
    formData.append("item_rarity", this.weapon.item_rarity);
    formData.append("item_price", JSON.stringify(this.weapon.item_price));
    return formData;
  }
  validate() {
    this.$toast.clear();
    let next = true;
    let error = 0;
    if (!this.nameState) {
      error++;
      next = false;
      if (error < 5) this.errorToast("Preencha o nome!");
    }
    if (!this.itemTypeState) {
      error++;
      next = false;
      if (error < 5) this.errorToast("Selecione o tipo!");
    }
    if (!this.itemRarityState) {
      error++;
      next = false;
      if (error < 5) this.errorToast("Selecione a raridade!");
    }
    if (!this.factoryNewState) {
      error++;
      next = false;
      if (error < 5) this.errorToast("Preencha o valor de Factory New!");
    }
    if (!this.factoryNewStState) {
      error++;
      next = false;
      if (error < 5)
        this.errorToast("Preencha o valor de Factory New StatTrak!");
    }
    if (!this.minimalWearState) {
      error++;
      next = false;
      if (error < 5) this.errorToast("Preencha o valor de Minimal Wear!");
    }
    if (!this.minimalWearStState) {
      error++;
      next = false;
      if (error < 5)
        this.errorToast("Preencha o valor de Minimal Wear StatTrak!");
    }
    if (!this.fieldTestedState) {
      error++;
      next = false;
      if (error < 5) this.errorToast("Preencha o valor de Field Tested!");
    }
    if (!this.fieldTestedStState) {
      error++;
      next = false;
      if (error < 5)
        this.errorToast("Preencha o valor de Field Tested StatTrak!");
    }
    if (!this.wellWornState) {
      error++;
      next = false;
      if (error < 5) this.errorToast("Preencha o valor de Well Worn!");
    }
    if (!this.wellWornStState) {
      error++;
      next = false;
      if (error < 5) this.errorToast("Preencha o valor de Well Worn StatTrak!");
    }
    if (!this.battleScarredState) {
      error++;
      next = false;
      if (error < 5) this.errorToast("Preencha o valor de Battle Scarred!");
    }
    if (!this.battleScarredStState) {
      error++;
      next = false;
      if (error < 5)
        this.errorToast("Preencha o valor de Battle Scarred StatTrak!");
    }
    if (!this.imageState) {
      error++;
      next = false;
      if (error < 5) this.errorToast("Preencha a imagem!");
    }
    return next;
  }
}
const weapon = new Weapon();
module.exports = {
  create: weapon.create,
  loadData: weapon.loadData,
  update: weapon.update,
  validate: weapon.validate,
  createPayload: weapon.createPayload
};
