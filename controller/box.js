class Box {
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
    } catch (e) {
      this.errorToast("Houve um erro ao carregar a lista de weapons");
    }
  }

  async create() {
    if (this.validate()) {
      this.loading = true;
    }
  }

  recalculateDropRateTotal() {
    this.drop_rate_box_total = 100;
    this.box.weapons.forEach((weapon) => {
      this.drop_rate_box_total -= weapon.drop_rate
        .replaceAll("%", "")
        .replaceAll(" ", "");
    });
    if (this.drop_rate_box_total < 0)
      this.errorToast("A caixa excede o limite de chance de drop!");
  }

  removeWeapon(index) {
    this.box.weapons.splice(index, 1);
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
    if (!this.priceState) {
      error++;
      next = false;
      if (error < 5) this.errorToast("Preencha o preço!");
    }
    if (!this.discountState && this.discountState !== null) {
      error++;
      next = false;
      if (error < 5) this.errorToast("Preencha corretamente o desconto!");
    }
    this.box.weapons.forEach((item, index) => {
      if (!validator.isNotEmpty(item.weapon)) {
        error++;
        next = false;
        if (error < 5)
          this.errorToast(`Preencha o nome corretamente no item ${index + 1}!`);
      }
      if (!validator.isNotEmpty(item.drop_rate)) {
        error++;
        next = false;
        if (error < 5)
          this.errorToast(
            `Preencha a chance de drop corretamente no item ${index + 1}!`
          );
      }
    });
    if (this.drop_rate_box_total !== 0) {
      error++;
      next = false;
      if (error < 5)
        this.errorToast(`A soma das chances de drop precisa ser igual a 100!`);
    }
    return next;
  }
}

const box = new Box();

module.exports = {
  loadWeapons: box.loadWeapons,
  create: box.create,
  recalculateDropRateTotal: box.recalculateDropRateTotal,
  removeWeapon: box.removeWeapon,
  validate: box.validate,
};
